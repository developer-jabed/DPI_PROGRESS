import { z } from "zod";
import { Gender, UserStatus, BloodGroup } from "@prisma/client";

// ---------------- CREATE ADMIN ----------------
const createAdmin = z.object({
  password: z.string({ error: "Password is required" }),
  admin: z.object({
    name: z.string({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }).email("Invalid email"),
    contactNumber: z.string({ error: "Contact Number is required" }),
    profilePhoto: z.string().optional(),
  }),
});

// ---------------- CREATE TEACHER ----------------
const createTeacher = z.object({
  password: z.string({ error: "Password is required" }),
  teacher: z.object({
    name: z.string({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }).email("Invalid email"),
    contactNumber: z.string({ error: "Contact Number is required" }),
    qualification: z.string({ error: "Qualification is required" }),
    bio: z.string().optional(),
    profilePhoto: z.string().optional(),
  }),
});

// ---------------- CREATE STUDENT ----------------
const createStudent = z.object({
  password: z.string({ error: "Password is required" }),
  student: z.object({
    name: z.string({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }).email("Invalid email"),
    contactNumber: z.string({ error: "Contact Number is required" }),
    parentsNumber: z.string({ error: "Parents number is required" }),
    fatherName: z.string({ error: "Father name is required" }),
    motherName: z.string({ error: "Mother name is required" }),
    dateOfBirth: z.string({ error: "Date of birth is required" }),
    bCertNid: z.string().optional(),
    bloodGroup: z.nativeEnum(BloodGroup).refine(val => Object.values(BloodGroup).includes(val), { message: "Invalid blood group" }),
    fatherNid: z.string().optional(),
    motherNid: z.string().optional(),
    roll: z.string().optional(),
    registration: z.string().optional(),
    session: z.string().optional(),
    gender: z.nativeEnum(Gender).refine(val => Object.values(Gender).includes(val), { message: "Invalid gender" }),
    address: z.string({ error: "Address is required" }),
    profilePhoto: z.string().optional(),
  }),
});

// ---------------- CREATE CR ----------------
const createCr = z.object({
  password: z.string({ error: "Password is required" }),
  cr: z.object({
    name: z.string({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }).email("Invalid email"),
    contactNumber: z.string({ error: "Contact Number is required" }),
    profilePhoto: z.string().optional(),
  }),
});

// ---------------- UPDATE PROFILE STATUS ----------------
const updateStatus = z.object({
  body: z.object({
    status: z.nativeEnum(UserStatus).refine(val => Object.values(UserStatus).includes(val), { message: "Invalid status" }),
  }),
});

export const userValidation = {
  createAdmin,
  createTeacher,
  createStudent,
  createCr,
  updateStatus,
};
