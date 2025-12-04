export const formatDuration = (ms) => {
    if (ms === null || ms === undefined || isNaN(ms)) return "00:00:00";
  
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
  

  export const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };
  