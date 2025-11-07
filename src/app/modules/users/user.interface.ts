import { Role } from "@prisma/client";

export interface IUserBase {
  displayName?: string;
  email?: string;
  password: string;
  role: Role;
  profileUrl?: string;
}

export interface ICreateStudent {
  rollNumber: string;
  registrationNumber: string;
  phoneNumber: string;
  parentsPhone: string;
  batchId: string;
}

export interface ICreateTeacher {
  bio?: string;
  phoneNumber?: string;
  departmentId: string;
  subjects?: string[];
}

export interface ICreateCr {
  batchId: string;
}

export interface ICreateAdmin {
  displayName: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  email?: string;
  displayName?: string;
  role: Role;
  profileUrl?: string;
  createdAt: Date;
}
