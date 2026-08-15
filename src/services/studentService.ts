import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { StudentRepository, UserRepository } from '../repositories/studentRepository';
import { Student, User, CustomError } from '../models/studentModel';

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

export class AuthService {
  private userRepository = new UserRepository();

  async login(email?: string, password?: string): Promise<{ token: string; user: Partial<User> }> {
    if (!email || !password) {
      const error: CustomError = new Error("Email et mot de passe requis");
      error.status = 400;
      throw error;
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.password) {
      const error: CustomError = new Error("Identifiants incorrects");
      error.status = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error: CustomError = new Error("Identifiants incorrects");
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret_key_dev',
      { expiresIn: '15m' }
    );

    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }

  async register(email?: string, password?: string): Promise<Partial<User>> {
    if (!email || !password) {
      const error: CustomError = new Error("Email et mot de passe requis");
      error.status = 400;
      throw error;
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      const error: CustomError = new Error("Un utilisateur existe déjà avec cet email");
      error.status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.create(email, hashedPassword);
  }
}