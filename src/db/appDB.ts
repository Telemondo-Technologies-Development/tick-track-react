import Dexie, { Table } from 'dexie';

    export interface Ticket {
        id?: number; 
        name: string;
        startTime: number;
        endTime: number;
        durationMs: number;
    }

    export class TickTrackDB extends Dexie {
        tickets!: Table<Ticket, number>;

        constructor() {
            super( 'TrickTrackDB');
            this.version(2).stores({
                tickets: '++id, name, startTime, endTime, durationMs'
            });
        }
    }


const db = new TickTrackDB();
export default db;