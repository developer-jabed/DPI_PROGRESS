import { prisma } from "../../shared/prisma";
import { Request } from "express";
import { Subject } from "@prisma/client";

// ===================== CREATE SUBJECT =====================
const createSubject = async (req: Request): Promise<Subject> => {
  const { code, title, semester, departmentIds, teacherIds } = req.body;

  const subject = await prisma.subject.create({
    data: {
      code,
      title,
      semester,
      departments: {
        connect: departmentIds?.map((id: string) => ({ id })),
      },
      teachers: {
        connect: teacherIds?.map((id: string) => ({ id })),
      },
    },
    include: {
      departments: true,
      teachers: true,
    },
  });

  return subject;
};

// ===================== UPDATE SUBJECT =====================
const updateSubject = async (req: Request): Promise<Subject> => {
  const { id } = req.params;
  const { code, title, semester, departmentIds, teacherIds } = req.body;

  const updated = await prisma.subject.update({
    where: { id },
    data: {
      code,
      title,
      semester,
      departments: {
        set: [], // remove all old
        connect: departmentIds?.map((id: string) => ({ id })), // add new
      },
      teachers: {
        set: [],
        connect: teacherIds?.map((id: string) => ({ id })),
      },
    },
    include: {
      departments: true,
      teachers: true,
    },
  });

  return updated;
};

// ===================== GET ALL SUBJECTS =====================
const getAllSubjects = async () => {
  return prisma.subject.findMany({
    include: {
      departments: true,
      teachers: true,
    },
  });
};

// ===================== GET SINGLE SUBJECT =====================
const getSubjectById = async (id: string) => {
  return prisma.subject.findUnique({
    where: { id },
    include: {
      departments: true,
      teachers: true,
    },
  });
};

// ===================== DELETE SUBJECT =====================
const deleteSubject = async (id: string) => {
  return prisma.subject.delete({
    where: { id },
  });
};

export const SubjectService = {
  createSubject,
  updateSubject,
  getAllSubjects,
  getSubjectById,
  deleteSubject,
};
