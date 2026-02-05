import Dexie from 'dexie';

export interface Shift {
  id?: number;
  userName: string;
  timeIn: number; 
  timeOut?: number; 
  durationMs?: number;
}

export interface Ticket {
  id?: number;
  name: string;
  startTime: number;
  endTime: number;
  durationMs: number;
}

class AppDB extends Dexie {
  tickets: Dexie.Table<Ticket, number>;
  shifts: Dexie.Table<Shift, number>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      tickets: '++id,name,startTime,durationMs',
      shifts: '++id,userName,timeIn,timeOut,durationMs'
    });

    this.tickets = this.table('tickets');
    this.shifts = this.table('shifts');
  }
}

const db = new AppDB();
export default db;
