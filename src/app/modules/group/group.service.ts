import { prisma } from "../../shared/prisma";
import { IGroupFilterRequest } from "./group.interface";
import { paginationHelper } from "../../helper/paginationHelper";
import { groupSearchableFields } from "./group.constant";
import { Prisma, GroupName } from "@prisma/client";

 const createGroup = async (payload: { name: GroupName; batchId: string }) => {
  return await prisma.group.create({ data: payload });
};

 const getAllGroups = async (filters: IGroupFilterRequest, paginationOptions: any) => {
  const { searchTerm, ...filterData } = filters;
  const { limit, page, skip } = paginationHelper.calculatePagination(paginationOptions);

  const andConditions: Prisma.GroupWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: groupSearchableFields.map((field) => ({
        [field]: searchTerm as GroupName,
      })),
    });
  }

  if (filterData.name) andConditions.push({ name: filterData.name });
  if (filterData.batchId) andConditions.push({ batchId: filterData.batchId });

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const data = await prisma.group.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      batch: true,
      students: true,
      cr: true,
    },
  });

  const total = await prisma.group.count({ where: whereConditions });

  return { meta: { total, page, limit }, data };
};

 const getGroupById = async (id: string) => {
  return prisma.group.findUniqueOrThrow({
    where: { id },
    include: { batch: true, students: true, cr: true },
  });
};


export const groupService = {
    createGroup,
    getAllGroups,
    getGroupById
}