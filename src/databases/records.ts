import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DATABASES } from '../global/utils';
import { escapeString } from './utils';

export class RecordsTable {
  #sqlite: SQLiteConnection;
  #table: SQLiteDBConnection;

  constructor(sqlite: SQLiteConnection) {
    this.#sqlite = sqlite;
  }

  async init(encrypted: boolean): Promise<boolean> {
    try {
      // Check the consistency between Js Connections and Native Connections if inconsistency all connections are removed
      const isConsistent = (await this.#sqlite.checkConnectionsConsistency()).result;

      const isConnected = (await this.#sqlite.isConnection(DATABASES.RECORDS, false)).result;

      if (isConsistent && isConnected) {
        this.#table = await this.#sqlite.retrieveConnection(DATABASES.RECORDS, false);
      } else {
        if (encrypted) {
          this.#table = await this.#sqlite.createConnection(DATABASES.RECORDS, true, 'secret', 1, false);
        } else {
          this.#table = await this.#sqlite.createConnection(
            DATABASES.RECORDS,
            false,
            'no-encryption',
            1,
            false
          );
        }
      }
      await this.#table.open();

      const createRecordsTable = `
        CREATE TABLE IF NOT EXISTS ${DATABASES.RECORDS} (
          id INTEGER PRIMARY KEY NOT NULL UNIQUE,
          record TEXT NOT NULL
        );
      `;
      await this.#table.execute(createRecordsTable);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(false);
    }
  }

  async addRecord(record: any): Promise<boolean> {
    if (this.#table === undefined) {
      return Promise.reject(new Error(`Table "${DATABASES.RECORDS}" does not exist`));
    }
    const addRecord = `INSERT INTO ${DATABASES.RECORDS} (record) VALUES ('${escapeString(
      JSON.stringify(record)
    )}');`;
    const addRecordRes = (await this.#table.execute(addRecord)).changes;
    return Promise.resolve(addRecordRes.changes === 1);
  }

  async getRecords(): Promise<{ id: number; record: any }[]> {
    if (this.#table === undefined) {
      return Promise.reject(new Error(`Table "${DATABASES.RECORDS}" does not exist`));
    }
    const selectRecords = `SELECT * from ${DATABASES.RECORDS};`;
    const selectRecordsRes = (await this.#table.query(selectRecords)).values;
    return Promise.resolve(selectRecordsRes.map((r) => ({ id: r.id, record: JSON.parse(r.record) })));
  }

  async deleteRecord(id: number): Promise<boolean> {
    if (this.#table === undefined) {
      return Promise.reject(new Error(`Table "${DATABASES.RECORDS}" does not exist`));
    }
    const deleteRecord = `DELETE FROM ${DATABASES.RECORDS} WHERE id = ${id};`;
    const deleteRecordRes = (await this.#table.run(deleteRecord)).changes;
    return Promise.resolve(deleteRecordRes.changes === 1);
  }
}
