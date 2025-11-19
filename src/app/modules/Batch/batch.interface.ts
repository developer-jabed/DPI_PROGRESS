export interface ICreateBatch {
  name: string;
  department: "CIVIL" | "COMPUTER" | "ARCHITECTURE" | "MECHANICAL" | "ELECTRICAL" | "POWER";
  group: "A" | "B";
  shift: "DAY" | "MORNING";
  crId?: string; // Optional CR assigned
}

export interface IUpdateBatch {
  name?: string;
  department?: "CIVIL" | "COMPUTER" | "ARCHITECTURE" | "MECHANICAL" | "ELECTRICAL" | "POWER";
  group?: "A" | "B";
  shift?: "DAY" | "MORNING";
  crId?: string | null; // allow null to remove CR
}
