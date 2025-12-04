import { useState, useEffect, useMemo } from 'react';
import db from '../db/appDB.js'; 


export const useTimer = () => {
  const [ticketName, setTicketName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [tempTicket, setTempTicket] = useState(null); 

 
  useEffect(() => {
    let interval;
    if (isRunning && startTime !== null) {
      const start = startTime; 
      interval = setInterval(() => {
        setElapsedTime(Date.now() - start);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);


  const resetState = () => {
    setTicketName('');
    setStartTime(null);
    setElapsedTime(0);
    setIsRunning(false);
    setTempTicket(null);
    document.getElementById('message-box').textContent = "";
  };
  


  const handleStartTimer = () => {
    if (!ticketName.trim()) {
      document.getElementById('message-box').textContent = "Ticket name is required!";
      setTimeout(() => document.getElementById('message-box').textContent = "", 3000);
      return;
    }
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsRunning(true);
    setTempTicket(null); 
  };

  const handleEndTimer = () => {
    if (!isRunning) return;

    setIsRunning(false);
    const endTime = Date.now();
    const finalDuration = endTime - startTime;

    const newTicket = {
      name: ticketName.trim(),
      startTime: startTime,
      endTime: endTime,
      durationMs: finalDuration,
    };
    
    setTempTicket(newTicket);
    setTicketName(newTicket.name);
  };

  const handleSave = async () => {
    if (!tempTicket) return;
    try {
      await db.tickets.add(tempTicket);
      resetState();
    } catch (error) {
      console.error("Failed to save ticket:", error);
      document.getElementById('message-box').textContent = "Error saving ticket!";
    }
  };

  const handleCancel = () => {
    resetState();
  };
  
 
  const step = useMemo(() => {
    if (isRunning) return 'running';
    if (tempTicket) return 'stopped';
    return 'new'; 
  }, [isRunning, tempTicket]);


  return {
    ticketName,
    setTicketName,
    elapsedTime,
    tempTicket,
    step,
    
    handleStartTimer,
    handleEndTimer,
    handleSave,
    handleCancel,
  };
};