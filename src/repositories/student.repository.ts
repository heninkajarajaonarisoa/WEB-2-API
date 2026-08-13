import { db } from '../config/database';
import { Student } from '../models/student.model';

export class StudentRepository {
  async findAll(): Promise<Student[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM students', [], (err, rows: Student[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  async findById(id: number): Promise<Student | undefined> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM students WHERE id = ?', [id], (err, row: Student) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async create(nom: string, age: number): Promise<Student> {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO students (nom, age) VALUES (?, ?)', [nom, age], function (this: any, err: Error | null) {
        if (err) reject(err);
        else resolve({ id: this.lastID, nom, age });
      });
    });
  }

  async update(id: number, nom: string, age: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.run('UPDATE students SET nom = ?, age = ? WHERE id = ?', [nom, age, id], function (this: any, err: Error | null) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  async delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM students WHERE id = ?', [id], function (this: any, err: Error | null) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }
}