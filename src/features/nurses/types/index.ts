// Nurse Types & Interfaces

export interface Nurse {
  id: number;
  name: string;
  phone: string;
  email: string;
  specialization: string;
}

export interface NurseDTO {
  id: number;
  name: string;
  phone: string;
  email: string;
  specialization: string;
}

export interface NursePostModel {
  id: number;
  name: string;
  phone: string;
  email: string;
  specialization: string;
}

export interface NursePutModel {
  name: string;
  phone: string;
  email: string;
  specialization: string;
}
