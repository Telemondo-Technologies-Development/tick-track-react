import React from "react";

interface TicketUIProps {
  ticketName: string;
  setTicketName: (value: string) => void;
  step: "new" | "running" | "stopped";
  currentDurationDisplay: string;
  handleStartTimer: () => void;
  handleEndTimer: () => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const TicketUI: React.FC<TicketUIProps> = ({
  ticketName,
  setTicketName,
  step,
  currentDurationDisplay,
  handleStartTimer,
  handleEndTimer,
  handleSave,
  handleCancel,
}) => {
  return (
    <div className="bg-indigo-50 border rounded-xl p-4 sm:p-6 shadow">
      <label className="text-sm font-medium text-gray-700 block mb-2">Ticket Name</label>
      <input
        type="text"
        value={ticketName}
        onChange={(e) => setTicketName(e.target.value)}
        placeholder="e.g. Ticket Name"
        disabled={step !== "new"}
        className="w-full p-3 rounded-lg border text-base sm:text-lg shadow-inner focus:ring-4 focus:ring-indigo-400 disabled:bg-gray-300"
      />
      <div className="mt-6 bg-gray-900 rounded-xl shadow-lg w-full max-w-md mx-auto p-4">
        <div className="flex items-center justify-center overflow-hidden">
          <span
            className="text-green-400 font-mono font-bold tracking-wider leading-none w-full text-center text-[clamp(2rem,7vw,3.5rem)] sm:text-[clamp(2.5rem,6vw,4rem)] md:text-[clamp(3rem,5vw,4.5rem)]"
          >
            {currentDurationDisplay}
          </span>
        </div>
      </div>
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
  );
};

export default TicketUI;