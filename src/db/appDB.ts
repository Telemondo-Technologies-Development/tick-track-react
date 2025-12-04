import Dexie, { Table } from 'dexie';

export interface Ticket {
    id?: number;
    name: string;
    startTime: number;
    endTime: number;
    durationMS: number;
}

export class TrickTrackDB extends Dexie {

    tickets!: Table<Ticket, number>;

    constructor() {
        super('TickTrackDB');
        this.version(1).stores({
            tickets: '++id, name. startTime, endTime, durationMS'
        });
    }
}