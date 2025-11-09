import { z } from "zod";
import { Role } from "@prisma/client";

const baseUserSchema = z.object({
  displayName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6),
  role: z.nativeEnum(Role),
});

const createStudentValidationSchema = z.object({
  data: baseUserSchema.extend({
    role: z.literal(Role.STUDENT),
    rollNumber: z.string(),
    registrationNumber: z.string(),
    phoneNumber: z.string(),
    parentsPhone: z.string(),
    batchId: z.string(),
  }),
});

const createTeacherValidationSchema = z.object({
  data: baseUserSchema.extend({
    role: z.literal(Role.TEACHER),
    bio: z.string().optional(),
    phoneNumber: z.string().optional(),
    departmentId: z.string(),
    subjects: z.array(z.string()).optional(),
    profileUrl: z.string().optional(),
  }),
});

const createCrValidationSchema = z.object({
  data: baseUserSchema.extend({
    role: z.literal(Role.CR), // <--- literal, cannot accept "CR" from request
    rollNumber: z.string(),
    registrationNumber: z.string(),
    phoneNumber: z.string(),
    parentsPhone: z.string(),
    batchId: z.string(),
  }),
});


const createAdminValidationSchema = z.object({
  data: baseUserSchema.extend({
    role: z.literal(Role.ADMIN),
    displayName: z.string(),
    email: z.string().email(),
  }),
});

export const UserValidation = {
  createStudentValidationSchema,
  createTeacherValidationSchema,
  createCrValidationSchema,
  createAdminValidationSchema,
};
