import { z } from "zod";

export const DepartmentValidation = {
  createDepartment: z.object({
    name: z.string().min(2, "Department name is required"),
  }),

  updateDepartment: z.object({
    name: z.string().min(2, "Department name is required").optional(),
  }),
};
