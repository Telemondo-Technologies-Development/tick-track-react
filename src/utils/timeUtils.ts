export const formatDuration = (ms: number | null | undefined): string => {
  if (ms === null || ms === undefined || isNaN(ms)) return '00:00:00';
  
  // Ensure we are working with a positive number
  const safeMs = Math.max(0, ms); 
  
  const totalSeconds = Math.floor(safeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number): string => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};