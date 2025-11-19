import { z } from "zod";
import { Department, UserRole } from "@prisma/client";

const departmentEnum = z.nativeEnum(Department);
const roleEnum = z.nativeEnum(UserRole);

// ----------------- Create Student -----------------
export const createStudentValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2),
  role: z.literal("STUDENT"),
  profileUrl: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  batchId: z.string(),
  phoneNumber: z.string(),
  parentsPhone: z.string(),
});

// ----------------- Create Teacher -----------------
export const createTeacherValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2),
  role: z.literal("TEACHER"),
  profileUrl: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  department: departmentEnum,
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
});

// ----------------- Create Admin -----------------
export const createAdminValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2),
  role: z.literal("ADMIN"),
  profileUrl: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  phoneNumber: z.string().optional(),
  designation: z.string().optional(),
});

// ----------------- Create CR -----------------
export const createCRValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2),
  role: z.literal("CR"),
  profileUrl: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  batchId: z.string(),
  studentId: z.string(),
});

export const UserValidation = {
  createStudentValidationSchema,
  createTeacherValidationSchema,
  createAdminValidationSchema,
  createCRValidationSchema,
};
