import { Shift } from "@prisma/client";

export interface IBatchCreateRequest {
  departmentId: string;
  semesterId: string;
  shift: Shift;
  year: number;
}

export interface IBatchFilterRequest {
  departmentId?: string;
  semesterId?: string;
  shift?: Shift;
  year?: number;
  searchTerm?: string;
}
