import React from "react";

interface ShiftUIProps {
  userName: string;
  setUserName: (value: string) => void;
  shiftStep: "new" | "started" | "stopped";
  handleTimeIn: () => void;
  handleTimeOut: () => void;
  saveShift: () => void;
  cancelShift: () => void;
}

const ShiftUI: React.FC<ShiftUIProps> = ({
  userName,
  setUserName,
  shiftStep,
  handleTimeIn,
  handleTimeOut,
  saveShift,
  cancelShift,
}) => {
  return (
    <div className="bg-yellow-50 border rounded-xl p-4 sm:p-6 shadow mt-6">
      <label className="text-sm font-medium text-gray-700 block mb-2">User Name</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
        disabled={shiftStep !== "new"}
        className="w-full p-3 rounded-lg border text-base sm:text-lg shadow-inner focus:ring-4 focus:ring-yellow-400 disabled:bg-gray-300"
      />
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        {shiftStep === "new" && (
          <button
            onClick={handleTimeIn}
            disabled={!userName.trim()}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-400"
          >
            TIME IN
          </button>
        )}
        {shiftStep === "started" && (
          <button
            onClick={handleTimeOut}
            className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700"
          >
            TIME OUT
          </button>
        )}
        {shiftStep === "stopped" && (
          <>
            <button
              onClick={saveShift}
              className="w-full py-3 bg-yellow-600 text-white rounded-xl font-bold hover:bg-yellow-700"
            >
              SAVE
            </button>
            <button
              onClick={cancelShift}
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

export default ShiftUI;