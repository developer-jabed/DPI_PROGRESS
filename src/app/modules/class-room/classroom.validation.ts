import { z } from "zod";

export const createClassroomValidationSchema = z.object({
  name: z.string().min(2, "Classroom name is required"),
  departmentId: z.string().optional(),
  capacity: z.number().min(1, "Capacity must be greater than 0"),
});