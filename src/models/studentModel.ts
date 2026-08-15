export interface Student {
  id?: number;
  nom: string;
  age: number;
}

export interface User {
  id?: number;
  email: string;
  password?: string;
  role?: string;
}

export interface CustomError extends Error {
  status?: number;
}