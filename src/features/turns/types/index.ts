// Turn Types & Interfaces

export interface Turn {
  id: number;
  babyId: number;
  nurseId: number;
  date: string;
  time: string;
  notes: string;
}

export interface TurnDTO {
  id: number;
  babyId: number;
  nurseId: number;
  date: string;
  time: string;
  notes: string;
}

export interface TurnPostModel {
  id: number;
  babyId: number;
  nurseId: number;
  date: string;
  time: string;
  notes: string;
}

export interface TurnPutModel {
  babyId: number;
  nurseId: number;
  date: string;
  time: string;
  notes: string;
}
