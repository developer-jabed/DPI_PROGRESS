import { UserRole, Department } from "@prisma/client";

export interface ICreateUser {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
  profileUrl?: string;
  status?: "ACTIVE" | "INACTIVE";
  batchId?: string;
  studentId?: string;
  phoneNumber?: string;
  parentsPhone?: string;
  designation?: string;
  bio?: string;
  department?: Department;
}

export interface IQueryOptions {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
}
