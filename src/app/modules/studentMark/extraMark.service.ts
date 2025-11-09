// src/app/modules/student/extraMark.service.ts
import { prisma } from "../../shared/prisma";

interface CreateExtraMarkInput {
  studentId: string;
  teacherId: string;
  points: number;
  reason?: string;
}

export const ExtraMarkService = {
  async createExtraMark(data: CreateExtraMarkInput) {
    return prisma.extraMark.create({
      data,
      include: {
        student: true,
        givenBy: true,
      },
    });
  },

  async getExtraMarksByStudent(studentId: string) {
    return prisma.extraMark.findMany({
      where: { studentId },
      include: {
        student: true,
        givenBy: true,
      },
    });
  },

  async deleteExtraMark(id: string) {
    return prisma.extraMark.delete({
      where: { id },
    });
  },
};
