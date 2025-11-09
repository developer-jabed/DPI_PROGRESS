// src/app/modules/teacher/teacherLeave.service.ts
import { prisma } from "../../shared/prisma";

interface CreateLeaveInput {
  teacherId: string;
  startDate: Date;
  endDate: Date;
  reason?: string;
}

export const TeacherLeaveService = {
  async createLeave(data: CreateLeaveInput) {
    return prisma.teacherLeave.create({
      data,
    });
  },

  async getTeacherLeaves(teacherId: string) {
    return prisma.teacherLeave.findMany({
      where: { teacherId },
    });
  },

  async deleteLeave(id: string) {
    return prisma.teacherLeave.delete({
      where: { id },
    });
  },
};
