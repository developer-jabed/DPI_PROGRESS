import { prisma } from "../../shared/prisma";
import { IBatchCreateRequest, IBatchFilterRequest } from "./batch.interface";
import { batchSearchableFields } from "./batch.constant";
import { Prisma, Shift } from "@prisma/client";
import { paginationHelper } from "../../helper/paginationHelper";

// ---------------- CREATE BATCH ----------------
const createBatch = async (payload: IBatchCreateRequest) => {
  // Validate and convert shift string to enum
  let shiftValue: Shift;
  if (payload.shift === "MORNING") shiftValue = Shift.MORNING;
  else if (payload.shift === "DAY") shiftValue = Shift.DAY;
  else throw new Error("Invalid shift value");

  return await prisma.batch.create({
    data: {
      departmentId: payload.departmentId,
      semesterId: payload.semesterId,
      shift: shiftValue,
      year: payload.year,
    },
    include: {
      department: true,
      semester: true,
      groups: true,
      teachers: true,
    },
  });
};

const getAllBatches = async (filters: IBatchFilterRequest, paginationOptions: any) => {
  const { searchTerm, ...filterData } = filters;
  const { limit, page, skip } = paginationHelper.calculatePagination(paginationOptions);

  const andConditions: Prisma.BatchWhereInput[] = [];

  // 1️⃣ Search logic
  if (searchTerm) {
    const orConditions: Prisma.BatchWhereInput[] = [];

    batchSearchableFields.forEach(field => {
      if (field === "year") {
        const yearValue = Number(searchTerm);
        if (!isNaN(yearValue)) {
          orConditions.push({ year: yearValue });
        }
      } else if (field === "shift") {
        if (["MORNING", "DAY"].includes(searchTerm.toUpperCase())) {
          orConditions.push({ shift: searchTerm.toUpperCase() as "MORNING" | "DAY" });
        }
      } else {
        // string fields
        orConditions.push({ [field]: { contains: searchTerm, mode: "insensitive" } });
      }
    });

    if (orConditions.length > 0) andConditions.push({ OR: orConditions });
  }

  // 2️⃣ Filter logic (exact match)
  (["departmentId", "semesterId", "shift", "year"] as const).forEach(key => {
    if (filterData[key] !== undefined) {
      andConditions.push({
        [key]: filterData[key] as any,
      });
    }
  });

  const whereConditions: Prisma.BatchWhereInput = andConditions.length ? { AND: andConditions } : {};

  const data = await prisma.batch.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      department: true,
      semester: true,
      groups: true,
      teachers: true,
    },
  });

  const total = await prisma.batch.count({ where: whereConditions });

  return { meta: { total, page, limit }, data };
};



// ---------------- GET BATCH BY ID ----------------
const getBatchById = async (id: string) => {
  return await prisma.batch.findUniqueOrThrow({
    where: { id },
    include: {
      department: true,
      semester: true,
      groups: true,
      teachers: true,
    },
  });
};

// ---------------- DELETE BATCH ----------------


export const batchService = {
  createBatch,
  getAllBatches,
  getBatchById,

};
