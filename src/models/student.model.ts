export interface Student {
  id?: number;
  nom: string;
  age: number;
}

export interface CustomError extends Error {
  status?: number;
}