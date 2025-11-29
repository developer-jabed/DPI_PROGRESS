import { SemesterName } from "@prisma/client";

export interface ISemesterFilterRequest {
  searchTerm?: string;
  name?: SemesterName;
}
