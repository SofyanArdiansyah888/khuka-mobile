import { openDB } from 'idb';

const DB_NAME = 'khukhadb';
const STORE_NAME = 'khukha';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const setItem = async (key: string, value: any) => {
  const db = await initDB();
  await db.put(STORE_NAME, value, key);
};

export const getItem = async (key: string) => {
  const db = await initDB();
  return db.get(STORE_NAME, key);
};

export const removeItem = async (key: string) => {
  const db = await initDB();
  await db.delete(STORE_NAME, key);
};
