import { DepartmentName } from "@prisma/client";

export interface IDepartmentFilterRequest {
  searchTerm?: string;
  name?: DepartmentName;
}
