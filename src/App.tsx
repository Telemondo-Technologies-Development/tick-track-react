import React, { useMemo, useState } from 'react';
import db from './db/appDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { useTimer } from './hooks/useTimer';
import { useShiftTimer } from './hooks/useShiftTimer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TicketHistory from "./components/TicketHistory";
import ShiftHistory from "./components/ShiftHistory";
import ShiftUI from "./Pages/ShiftUi";
import TicketUI from "./Pages/TicketUi";

const App: React.FC = () => {
  const tickets = useLiveQuery(() => db.tickets.orderBy('id').reverse().toArray(), []);
  const shifts = useLiveQuery(() => db.shifts.orderBy('id').reverse().toArray(), []);

  const [ticketToDeleteId, setTicketToDeleteId] = useState<number | null>(null);
  const [shiftToDeleteId, setShiftToDeleteId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'ticket' | 'shift'>('ticket');
  const [showHistory, setShowHistory] = useState(false);
  const [showShiftHistory, setShowShiftHistory] = useState(false);

  const {
    ticketName,
    setTicketName,
    elapsedTime,
    tempTicket,
    step: ticketStep, 
    handleStartTimer,
    handleEndTimer,
    handleSave,
    handleCancel,
  } = useTimer();

  const {
    userName,
    setUserName,
    step: shiftStep, 
    handleTimeIn,
    handleTimeOut,
    saveShift,
    cancelShift,
  } = useShiftTimer();

  const currentDurationDisplay = useMemo(() => {
    if (ticketStep === "running") return `${Math.floor(elapsedTime / 3600)}:${Math.floor((elapsedTime % 3600) / 60)}:${elapsedTime % 60}`;
    if (ticketStep === "stopped" && tempTicket) return `${Math.floor(tempTicket.durationMs / 3600)}:${Math.floor((tempTicket.durationMs % 3600) / 60)}:${tempTicket.durationMs % 60}`;
    return "00:00:00";
  }, [elapsedTime, tempTicket, ticketStep]);

  if (!tickets || !shifts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-indigo-600 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-xl p-5 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-700 mb-3">
          Offline Tick-Track
        </h1>
        <p className="text-center text-xs sm:text-sm text-gray-500 mb-6">
          Track your tasks anytime.
        </p>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ticket' | 'shift')} className="mb-4">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="ticket" className="text-sm sm:text-base py-2">Ticket</TabsTrigger>
            <TabsTrigger value="shift" className="text-sm sm:text-base py-2">Time In / Out</TabsTrigger>
          </TabsList>

          <TabsContent value="ticket">
            <TicketUI
              ticketName={ticketName}
              setTicketName={setTicketName}
              step={ticketStep}
              currentDurationDisplay={currentDurationDisplay}
              handleStartTimer={handleStartTimer}
              handleEndTimer={handleEndTimer}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
            <TicketHistory
              tickets={tickets}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              setTicketToDeleteId={setTicketToDeleteId}
            />
          </TabsContent>

          <TabsContent value="shift">
            <ShiftUI
              userName={userName}
              setUserName={setUserName}
              shiftStep={shiftStep}
              handleTimeIn={handleTimeIn}
              handleTimeOut={handleTimeOut}
              saveShift={saveShift}
              cancelShift={cancelShift}
            />
            <ShiftHistory
              shifts={shifts}
              showShiftHistory={showShiftHistory}
              setShowShiftHistory={setShowShiftHistory}
              setShiftToDeleteId={setShiftToDeleteId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default App;