import { GroupName } from "@prisma/client";

export interface IGroupFilterRequest {
  searchTerm?: string;
  name?: GroupName;
  batchId?: string;
}
