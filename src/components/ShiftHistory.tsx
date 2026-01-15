import React from "react";
import { Shift } from "../db/appDB";
import { formatDuration } from "../utils/timeUtils";

interface ShiftHistoryProps {
  shifts: Shift[];
  showShiftHistory: boolean;
  setShowShiftHistory: (value: boolean) => void;
  setShiftToDeleteId: (id: number | null) => void;
}

const ShiftHistory: React.FC<ShiftHistoryProps> = ({
  shifts,
  showShiftHistory,
  setShowShiftHistory,
  setShiftToDeleteId,
}) => {
  return (
    <>
      <h2
        className="text-xl sm:text-2xl font-bold mt-8 mb-4 cursor-pointer text-yellow-700 hover:underline"
        onClick={() => setShowShiftHistory(!showShiftHistory)}
      >
        Shift History
      </h2>

      {showShiftHistory && (
        <>
          {shifts.length === 0 ? (
            <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md">
              No shifts yet — start your first shift above.
            </div>
          ) : (
            <div className="space-y-3 mt-3">
              {shifts.map((s) => (
                <div
                  key={s.id}
                  className="bg-white border rounded-lg shadow p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{s.userName}</p>
                    <p className="text-xs text-gray-500">
                      In: {new Date(s.timeIn).toLocaleString()}
                    </p>
                    {s.timeOut && (
                      <p className="text-xs text-gray-500">
                        Out: {new Date(s.timeOut).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {s.durationMs && (
                      <span className="font-bold text-lg text-yellow-700">
                        {formatDuration(s.durationMs)}
                      </span>
                    )}
                    <button
                      onClick={() => s.id && setShiftToDeleteId(s.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                      aria-label={`Delete shift of ${s.userName}`}
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

export default ShiftHistory;