import { prisma } from "../../shared/prisma";
import { Department } from "@prisma/client";

const createDepartment = async (data: { name: string }): Promise<Department> => {
  return prisma.department.create({
    data: {
      name: data.name,
    },
  });
};

const getAllDepartments = async (): Promise<Department[]> => {
  return prisma.department.findMany({
    include: {
      subjects: true,
      teachers: true,
      batches: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getDepartmentById = async (id: string): Promise<Department | null> => {
  return prisma.department.findUnique({
    where: { id },
    include: {
      subjects: true,
      teachers: true,
      batches: true,
    },
  });
};

const updateDepartment = async (
  id: string,
  data: { name?: string }
): Promise<Department> => {
  return prisma.department.update({
    where: { id },
    data,
  });
};

const deleteDepartment = async (id: string): Promise<Department> => {
  return prisma.department.delete({
    where: { id },
  });
};

export const DepartmentService = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
