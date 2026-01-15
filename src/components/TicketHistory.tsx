import React from "react";
import { Ticket } from "../db/appDB";
import { formatDuration } from "../utils/timeUtils";

interface TicketHistoryProps {
  tickets: Ticket[];
  showHistory: boolean;
  setShowHistory: (value: boolean) => void;
  setTicketToDeleteId: (id: number | null) => void;
}

const TicketHistory: React.FC<TicketHistoryProps> = ({
  tickets,
  showHistory,
  setShowHistory,
  setTicketToDeleteId,
}) => {
  return (
    <>
      <h2
        className="text-xl sm:text-2xl font-bold mt-8 mb-4 cursor-pointer text-indigo-700 hover:underline"
        onClick={() => setShowHistory(!showHistory)}
      >
        History
      </h2>

      {showHistory && (
        <>
          {tickets.length === 0 ? (
            <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md">
              No tickets yet — start your first timer above.
            </div>
          ) : (
            <div className="space-y-3 mt-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white border rounded-lg shadow p-4 flex justify-between items-center"
                >
                  <div className="w-2/3">
                    <p className="font-semibold text-gray-900 truncate">{ticket.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(ticket.startTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-indigo-700">
                      {formatDuration(ticket.durationMs)}
                    </span>
                    <button
                      onClick={() => ticket.id && setTicketToDeleteId(ticket.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                      aria-label={`Delete ticket ${ticket.name}`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TicketHistory;