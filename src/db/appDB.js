import Dexie from 'dexie';


const db = new Dexie('TickTrackDB');
db.version(1).stores({
    tickets: '++id, name, startTime, endTime, durationMs' 
});

export default db;