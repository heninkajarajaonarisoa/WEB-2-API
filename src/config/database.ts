import sqlite3 from 'sqlite3';

const verboseSqlite = sqlite3.verbose();

export const db = new verboseSqlite.Database('./database.sqlite', (err) => {
  if (err) {
    console.error("Erreur de connexion SQLite :", err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
  }
});


db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      age INTEGER NOT NULL
    )
  `);


  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'USER'
    )
  `);
});