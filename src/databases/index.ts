import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { generatePassphrase } from '../global/crypto';
import { IS_NATIVE } from '../global/utils';
import store from '../store/store';
import { RecordsTable } from './records';

type Databases = {
  init: () => Promise<void>;
  records: RecordsTable;
};

/**
 * Initialize the database and create required tables
 */
const initDatabase = async () => {
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);

  try {
    if (!IS_NATIVE) {
      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      await sqlite.initWebStore();
    }

    // Encryption is only supported on native platforms
    if (IS_NATIVE) {
      // Clear the current encryption secret
      // await sqlite.clearEncryptionSecret();

      // Check if there is an encryption secret
      const isSecretStored = (await sqlite.isSecretStored()).result ?? false;

      // If there is no secret stored to encrypt the database, set one
      if (!isSecretStored) {
        const passphrase = await generatePassphrase();
        await sqlite.setEncryptionSecret(passphrase);
      }
    }

    // Create encrypted records table
    databases.records = new RecordsTable(sqlite);
    await databases.records.init(IS_NATIVE);

    // Let everyone know that the database is ready
    store.database.set('isInitialized', true);
  } catch (error) {
    console.log(`${error}`);
  }
};

const databases: Databases = {
  init: initDatabase,
  records: undefined,
};

export default databases;
