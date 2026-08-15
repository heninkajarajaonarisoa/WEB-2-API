import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/studentService';

export class StudentController {
  private service = new StudentService();

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await this.service.getAllStudents();
      res.status(200).json(students);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const student = await this.service.getStudentById(id);
      res.status(200).json(student);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nom, age } = req.body;
      const newStudent = await this.service.createStudent(nom, age);
      res.status(201).json(newStudent);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { nom, age } = req.body;
      const updated = await this.service.updateStudent(id, nom, age);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  };

  patch = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { nom, age } = req.body;
      const patched = await this.service.patchStudent(id, nom, age);
      res.status(200).json(patched);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      await this.service.deleteStudent(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}