import React, { useMemo, useState } from 'react';
import db, { Ticket } from './db/appDB';
import { useLiveQuery } from 'dexie-react-hooks';
import  { useTimer }  from './hooks/useTimer.ts';
import { formatDuration } from './utils/timeUtils.ts'; 


interface DeleteConfirmationModalProps {
    ticket: Ticket;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ ticket, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-bold text-red-600 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Confirm Deletion
            </h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to permanently delete the ticket?: 
              <span className="font-semibold text-gray-900 block mt-1 p-2 bg-red-50 rounded-lg">"{ticket.name}"</span>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
              >
                Delete Permanently
              </button>
            </div>
        </div>
    </div>
);


const App: React.FC = () => {

  const tickets: Ticket[] | undefined = useLiveQuery(() => 
    db.tickets.orderBy('id').reverse().toArray()
  , []);

  const [ticketToDeleteId, setTicketToDeleteId] = useState<number | null>(null);

  const confirmDelete = async () => {
    if (ticketToDeleteId === null) return;
    try {
      await db.tickets.delete(ticketToDeleteId);
    } catch (error) {
      console.error("Failed to delete ticket:", error);
    } finally {
      setTicketToDeleteId(null);
    }
  };

  const pendingDeleteTicket = useMemo(() => {

    return tickets ? (tickets as Ticket[]).find(t => t.id === ticketToDeleteId) : null;
  }, [tickets, ticketToDeleteId]);
  

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


  const currentDurationDisplay = useMemo<string>(() => {
    if (step === 'running') {
      return formatDuration(elapsedTime);
    } else if (step === 'stopped' && tempTicket) {
      return formatDuration(tempTicket.durationMs);
    }
    return '00:00:00';
  }, [elapsedTime, tempTicket, step]);


  if (tickets === undefined) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-indigo-600 animate-pulse">
                Loading...
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-6 sm:p-8 mx-auto">
        <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 pb-2 border-b-4 border-indigo-100 text-center">
            Offline Tick-Track
        </h1>       
        <p className="text-sm text-gray-500 mb-6 text-center">
            Track your tasks anytime, anywhere!.
        </p>

        <div id="message-box" className="h-6 text-center text-red-600 font-semibold mb-4 transition-all"></div>

        <div className="space-y-5 mb-10 p-6 border border-indigo-200 rounded-xl bg-indigo-50 shadow-lg">
          
            <label className="block text-sm font-medium text-gray-700">Ticket Name</label>
            <input
                type="text"
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
                placeholder="e.g., 'Ticket Number or Ticket Name'"
                disabled={step !== 'new'}
                className={`w-full p-3 border ${step === 'new' ? 'border-indigo-400' : 'border-gray-300 bg-gray-200'} rounded-lg focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg shadow-inner`}
            />

            <div className="text-center py-8 bg-gray-900 text-green-400 rounded-xl shadow-2xl">
                <div className="timer-font text-7xl font-bold tracking-widest">
                    {currentDurationDisplay}
                </div>
            </div>

            <div className="flex justify-center space-x-4 pt-4">
                {step === 'new' && (
                    <button
                        onClick={handleStartTimer}
                        disabled={!ticketName.trim()}
                        className="flex-1 px-8 py-4 bg-green-600 text-white font-extrabold text-lg rounded-xl shadow-lg shadow-green-400/50 hover:bg-green-700 transition duration-200 transform hover:scale-[1.03] disabled:bg-gray-400 disabled:shadow-none"
                    >
                        START TIME
                    </button>
                )}

                {step === 'running' && (
                    <button
                        onClick={handleEndTimer}
                        className="flex-1 px-8 py-4 bg-red-600 text-white font-extrabold text-lg rounded-xl shadow-lg shadow-red-400/50 hover:bg-red-700 transition duration-200 transform hover:scale-[1.03]"
                    >
                        END TIME
                    </button>
                )}

                {step === 'stopped' && (
                    <>
                        <button
                            onClick={handleSave}
                            className="flex-1 px-8 py-4 bg-indigo-600 text-white font-extrabold text-lg rounded-xl shadow-lg shadow-indigo-400/50 hover:bg-indigo-700 transition duration-200 transform hover:scale-[1.03]"
                        >
                            SAVE
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 px-8 py-4 bg-gray-300 text-gray-800 font-extrabold text-lg rounded-xl shadow-lg hover:bg-gray-400 transition duration-200 transform hover:scale-[1.03]"
                        >
                            CANCEL
                        </button>
                    </>
                )}
            </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pt-4 border-t border-gray-200">History</h2>
        
        {tickets.length === 0 && (
          <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
             Start your first tracking session above.
          </div>
        )}

        <div className="space-y-3">
          {tickets.map((ticket: Ticket) => (
            <div key={ticket.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between items-center transition-all hover:border-indigo-400">
              <div className="min-w-0 pr-4">
                <p className="text-lg font-semibold text-gray-900 truncate" title={ticket.name}>{ticket.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                    Started: {new Date(ticket.startTime).toLocaleDateString()} at {new Date(ticket.startTime).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="timer-font text-2xl font-bold text-indigo-700">
                  {formatDuration(ticket.durationMs)}
                </span>
                <button
                  onClick={() => ticket.id && setTicketToDeleteId(ticket.id)}
                  className="p-2 text-red-500 hover:text-red-700 rounded-full bg-red-100 transition-colors"
                  title="Delete Ticket"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
                    </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {ticketToDeleteId !== null && pendingDeleteTicket && (
        <DeleteConfirmationModal 
            ticket={pendingDeleteTicket}
            onConfirm={confirmDelete}
            onCancel={() => setTicketToDeleteId(null)}
        />
      )}
    </div>
  );
};

export default App;