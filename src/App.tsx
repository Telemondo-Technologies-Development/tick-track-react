import React, { useMemo, useState } from 'react';
import db from './db/appDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { useTimer } from './hooks/useTimer';
import { useShiftTimer } from './hooks/useShiftTimer';
import { formatDuration } from './utils/timeUtils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TicketHistory from "./components/TicketHistory";
import ShiftHistory from "./components/ShiftHistory";
import ShiftUI from "./ShiftUi";
import TicketUI from "./TicketUi";


interface DeleteConfirmationModalProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ name, onConfirm, onCancel }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    role="dialog"
    aria-modal="true"
  >
    <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-5 text-center">
      <h3 className="text-lg sm:text-xl font-bold text-red-600 mb-2">
        Confirm Deletion
      </h3>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        Delete this item?
        <span className="block mt-2 font-semibold text-gray-900 p-2 bg-red-100 rounded-md">
          "{name}"
        </span>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={onCancel}
          className="w-full py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Delete Permanently
        </button>
      </div>
    </div>
  </div>
);

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
    step,
    handleStartTimer,
    handleEndTimer,
    handleSave,
    handleCancel,
  } = useTimer();

  const {
    userName,
    setUserName,
    shift,
    step: shiftStep,
    handleTimeIn,
    handleTimeOut,
    saveShift,
    cancelShift,
  } = useShiftTimer();


  const currentDurationDisplay = useMemo(() => {
    if (step === "running") return formatDuration(elapsedTime);
    if (step === "stopped" && tempTicket) return formatDuration(tempTicket.durationMs);
    return "00:00:00";
  }, [elapsedTime, tempTicket, step]);

  const pendingDeleteTicket = useMemo(
    () => tickets?.find(t => t.id === ticketToDeleteId) ?? null,
    [tickets, ticketToDeleteId]
  );

  const pendingDeleteShift = useMemo(
    () => shifts?.find(s => s.id === shiftToDeleteId) ?? null,
    [shifts, shiftToDeleteId]
  );


  const confirmDeleteTicket = async () => {
    if (ticketToDeleteId === null) return;
    try {
      await db.tickets.delete(ticketToDeleteId);
    } finally {
      setTicketToDeleteId(null);
    }
  };

  const confirmDeleteShift = async () => {
    if (shiftToDeleteId === null) return;
    try {
      await db.shifts.delete(shiftToDeleteId);
    } finally {
      setShiftToDeleteId(null);
    }
  };


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

        <div id="message-box" className="text-center text-red-600 font-medium h-5 mb-2"></div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ticket' | 'shift')}className="mb-4">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="ticket" className="text-sm sm:text-base py-2">Ticket</TabsTrigger>
            <TabsTrigger value="shift" className="text-sm sm:text-base py-2">Time In / Out</TabsTrigger>
            
            </TabsList>

            <TabsContent value="ticket">
              {/* Ticket UI */}
              <TicketUI
                ticketName={ticketName}
                setTicketName={setTicketName}
                step={step}
                currentDurationDisplay={currentDurationDisplay}
                handleStartTimer={handleStartTimer}
                handleEndTimer={handleEndTimer}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            {/* Ticket History */}
            <TicketHistory
                tickets={tickets}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                setTicketToDeleteId={setTicketToDeleteId}
              />
            </TabsContent>

            <TabsContent value="shift">
              {/* Shift UI */}
              <ShiftUI
                userName={userName}
                setUserName={setUserName}
                shiftStep={shiftStep}
                handleTimeIn={handleTimeIn}
                handleTimeOut={handleTimeOut}
                saveShift={saveShift}
                cancelShift={cancelShift}
              />

              {/* Shift History */}
              <ShiftHistory
                shifts={shifts}
                showShiftHistory={showShiftHistory}
                setShowShiftHistory={setShowShiftHistory}
                setShiftToDeleteId={setShiftToDeleteId}
              />
            </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {ticketToDeleteId && pendingDeleteTicket && (
        <DeleteConfirmationModal
          name={pendingDeleteTicket.name}
          onConfirm={confirmDeleteTicket}
          onCancel={() => setTicketToDeleteId(null)}
        />
      )}

      {shiftToDeleteId && pendingDeleteShift && (
        <DeleteConfirmationModal
          name={pendingDeleteShift.userName}
          onConfirm={confirmDeleteShift}
          onCancel={() => setShiftToDeleteId(null)}
        />
      )}
    </div>
  );
};

export default App;
