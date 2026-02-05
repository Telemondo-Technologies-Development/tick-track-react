import { useState } from "react";
import db, { Shift } from "../db/appDB";

export const useShiftTimer = () => {
  const [userName, setUserName] = useState("");
  const [shift, setShift] = useState<Shift | null>(null);
  const [step, setStep] = useState<"new" | "started" | "stopped">("new");

  const handleTimeIn = () => {
    const newShift: Shift = {
      userName,
      timeIn: Date.now()
    };
    setShift(newShift);
    setStep("started");
  };

  const handleTimeOut = () => {
    if (!shift) return;
    const finishedShift = {
      ...shift,
      timeOut: Date.now(),
      durationMs: Date.now() - shift.timeIn
    };
    setShift(finishedShift);
    setStep("stopped");
  };

  const saveShift = async () => {
    if (!shift) return;
    await db.shifts.add(shift);
    setShift(null);
    setUserName("");
    setStep("new");
  };

  const cancelShift = () => {
    setShift(null);
    setStep("new");
  };

  return {
    userName,
    setUserName,
    shift,
    step,
    handleTimeIn,
    handleTimeOut,
    saveShift,
    cancelShift
  };
};
