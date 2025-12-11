import React, { useMemo, useState } from 'react';
import db, { Ticket } from './db/appDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { useTimer } from './hooks/useTimer.ts';
import { formatDuration } from './utils/timeUtils.ts';
import { Button } from "./components/ui/button";
import { ButtonGroup } from "./components/ui/button-group";

interface DeleteConfirmationModalProps {
    ticket: Ticket;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ ticket, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-5 text-center">

            <h3 className="text-lg sm:text-xl font-bold text-red-600 mb-2">
                Confirm Deletion
            </h3>

            <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Delete this ticket?
                <span className="block mt-2 font-semibold text-gray-900 p-2 bg-red-100 rounded-md">
                    "{ticket.name}"
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

    const tickets = useLiveQuery(() =>
        db.tickets.orderBy('id').reverse().toArray()
    , []);

    const [ticketToDeleteId, setTicketToDeleteId] = useState<number | null>(null);

    const confirmDelete = async () => {
        if (ticketToDeleteId === null) return;
        try {
            await db.tickets.delete(ticketToDeleteId);
        } finally {
            setTicketToDeleteId(null);
        }
    };

    const pendingDeleteTicket = useMemo(() => {
        return tickets?.find((t) => t.id === ticketToDeleteId) ?? null;
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

    const currentDurationDisplay = useMemo(() => {
        if (step === "running") return formatDuration(elapsedTime);
        if (step === "stopped" && tempTicket) return formatDuration(tempTicket.durationMs);
        return "00:00:00";
    }, [elapsedTime, tempTicket, step]);

    if (!tickets) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold text-indigo-600 animate-pulse">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

            <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-xl p-5 sm:p-8">

                {/* Header */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-700 mb-3">
                    Offline Tick-Track
                </h1>

                <p className="text-center text-xs sm:text-sm text-gray-500 mb-6">
                    Track your tasks anytime.
                </p>

                <div id="message-box" className="text-center text-red-600 font-medium h-5 mb-2"></div>

                <div className='flex justify-start mb-2'>
                    <ButtonGroup>
                        <Button variant="outline"> Ticket </Button>
                        <Button variant="outline"> TimeIn/Out</Button>
                    </ButtonGroup>
                </div>


                {/* Timer + Input */}
                <div className="bg-indigo-50 border rounded-xl p-4 sm:p-6 shadow">

                    <label className="text-sm font-medium text-gray-700 block mb-2">
                        Ticket Name
                    </label>

                    <input
                        type="text"
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                        placeholder="e.g. Ticket Name"
                        disabled={step !== "new"}
                        className="w-full p-3 rounded-lg border text-base sm:text-lg shadow-inner focus:ring-4 focus:ring-indigo-400 disabled:bg-gray-300"
                    />

                    {/* Timer Display */}
                    <div className="text-center mt-6 p-6 bg-gray-900 rounded-xl text-green-400 shadow-lg">
                        <span className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-wide">
                            {currentDurationDisplay}
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">

                        {step === "new" && (
                            <button
                                onClick={handleStartTimer}
                                disabled={!ticketName.trim()}
                                className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-400"
                            >
                                START
                            </button>
                        )}

                        {step === "running" && (
                            <button
                                onClick={handleEndTimer}
                                className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700"
                            >
                                STOP
                            </button>
                        )}

                        {step === "stopped" && (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
                                >
                                    SAVE
                                </button>

                                <button
                                    onClick={handleCancel}
                                    className="w-full py-3 bg-gray-300 text-gray-800 rounded-xl font-bold hover:bg-gray-400"
                                >
                                    CANCEL
                                </button>
                            </>
                        )}

                    </div>
                </div>

                {/* History */}
                <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4">History</h2>

                {tickets.length === 0 && (
                    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md">
                        No tickets yet — start your first timer above.
                    </div>
                )}

                <div className="space-y-3 mt-3">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="bg-white border rounded-lg shadow p-4 flex justify-between items-center"
                        >

                            <div className="w-2/3">
                                <p className="font-semibold text-gray-900 truncate">
                                    {ticket.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {new Date(ticket.startTime).toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="font-bold text-lg text-indigo-700">
                                    {formatDuration(ticket.durationMs)}
                                </span>

                                <button
                                    onClick={() => setTicketToDeleteId(ticket.id)}
                                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                >
                                    🗑️
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

            {ticketToDeleteId && pendingDeleteTicket && (
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
