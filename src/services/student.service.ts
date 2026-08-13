import { StudentRepository } from '../repositories/student.repository';
import { Student, CustomError } from '../models/student.model';

export class StudentService {
  private repository = new StudentRepository();

  async getAllStudents(): Promise<Student[]> {
    return await this.repository.findAll();
  }

  async getStudentById(id: number): Promise<Student> {
    const student = await this.repository.findById(id);
    if (!student) {
      const error: CustomError = new Error("Étudiant non trouvé");
      error.status = 404;
      throw error;
    }
    return student;
  }

  async createStudent(nom?: string, age?: number): Promise<Student> {
    if (!nom || age === undefined || age === null) {
      const error: CustomError = new Error("Champs 'nom' et 'age' obligatoires");
      error.status = 400;
      throw error;
    }
    return await this.repository.create(nom, Number(age));
  }

  async updateStudent(id: number, nom?: string, age?: number): Promise<Student> {
    if (!nom || age === undefined || age === null) {
      const error: CustomError = new Error("Remplacement complet requis (nom et age)");
      error.status = 400;
      throw error;
    }
    const success = await this.repository.update(id, nom, Number(age));
    if (!success) {
      const error: CustomError = new Error("Étudiant non trouvé");
      error.status = 404;
      throw error;
    }
    return { id, nom, age: Number(age) };
  }

  async patchStudent(id: number, nom?: string, age?: number): Promise<Student> {
    const existing = await this.getStudentById(id);
    const nouveauNom = nom !== undefined ? nom : existing.nom;
    const nouvelAge = age !== undefined ? Number(age) : existing.age;

    await this.repository.update(id, nouveauNom, nouvelAge);
    return { id, nom: nouveauNom, age: nouvelAge };
  }

  async deleteStudent(id: number): Promise<void> {
    const success = await this.repository.delete(id);
    if (!success) {
      const error: CustomError = new Error("Étudiant non trouvé");
      error.status = 404;
      throw error;
    }
  }
}