// Baby Types & Interfaces

export interface Baby {
  id: number;
  name: string;
  age: number;
  family: string;
}

export interface BabyDTO {
  id: number;
  name: string;
  age: number;
  family: string;
}

export interface BabyPostModel {
  id: number;
  name: string;
  age: number;
  family: string;
}

export interface BabyPutModel {
  name: string;
  age: number;
  family: string;
}
