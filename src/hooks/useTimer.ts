import { useState, useEffect, useMemo } from 'react';
import db, { Ticket } from '../db/appDB'; 

interface UseTimerResult {
    ticketName: string;
    setTicketName: React.Dispatch<React.SetStateAction<string>>;
    elapsedTime: number;
    tempTicket: Ticket | null;
    step: 'new' | 'running' | 'stopped';
    handleStartTimer: () => void;
    handleEndTimer: () => void;
    handleSave: () => Promise<void>;
    handleCancel: () => void;
}

export const useTimer = (): UseTimerResult => {
    const [ticketName, setTicketName] = useState<string>('');
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [tempTicket, setTempTicket] = useState<Ticket | null>(null); 


    useEffect(() => {
        let interval: number | undefined;
        if (isRunning && startTime !== null) {
            const start = startTime; 
            interval = window.setInterval(() => {
                setElapsedTime(Date.now() - start);
            }, 1000);
        } else {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        }
        return () => {
             if (interval !== undefined) {
                clearInterval(interval);
            }
        };
    }, [isRunning, startTime]);


    const resetState = (): void => {
        setTicketName('');
        setStartTime(null);
        setElapsedTime(0);
        setIsRunning(false);
        setTempTicket(null);

        const msgBox = document.getElementById('message-box');
        if (msgBox) msgBox.textContent = "";
    };
    


    const handleStartTimer = (): void => {
        if (!ticketName.trim()) {
            const msgBox = document.getElementById('message-box');
            if (msgBox) msgBox.textContent = "Ticket name is required!";
            setTimeout(() => { if (msgBox) msgBox.textContent = ""; }, 3000);
            return;
        }
        setStartTime(Date.now());
        setElapsedTime(0);
        setIsRunning(true);
        setTempTicket(null); 
    };

    const handleEndTimer = (): void => {
        if (!isRunning || startTime === null) return;

        setIsRunning(false);
        const endTime = Date.now();
        const finalDuration = endTime - startTime;

        const newTicket: Ticket = {
            name: ticketName.trim(),
            startTime: startTime as number, 
            endTime: endTime,
            durationMs: finalDuration,
        };
        
        setTempTicket(newTicket);
        setTicketName(newTicket.name);
    };

    const handleSave = async (): Promise<void> => {
        if (!tempTicket) return;
        const msgBox = document.getElementById('message-box');
        try {
            await db.tickets.add(tempTicket);
            resetState();
        } catch (error) {
            console.error("Failed to save ticket:", error);
            if (msgBox) msgBox.textContent = "Error saving ticket!";
        }
    };

    const handleCancel = (): void => {
        resetState();
    };
    

    const step = useMemo<'new' | 'running' | 'stopped'>(() => {
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