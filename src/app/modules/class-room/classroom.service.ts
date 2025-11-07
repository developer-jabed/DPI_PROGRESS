import { prisma } from "../../shared/prisma";
import { Classroom } from "@prisma/client";

const createClassroom = async (data: {
  name: string;
  departmentId?: string;
  capacity: number;
}): Promise<Classroom> => {
  const classroom = await prisma.classroom.create({
    data: {
      name: data.name,
      capacity: data.capacity,
      departmentId: data.departmentId || null,
    },
  });

  return classroom;
};

const getAllClassrooms = async () => {
  return prisma.classroom.findMany({
    include: {
      department: true,
    },
  });
};

const getSingleClassroom = async (id: string) => {
  return prisma.classroom.findUnique({
    where: { id },
    include: { department: true },
  });
};

const deleteClassroom = async (id: string) => {
  return prisma.classroom.delete({
    where: { id },
  });
};

export const ClassroomService = {
  createClassroom,
  getAllClassrooms,
  getSingleClassroom,
  deleteClassroom,
};
