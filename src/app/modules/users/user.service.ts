import * as bcrypt from 'bcrypt';
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../shared/prisma";
import { paginationHelper } from "../../helper/paginationHelper";
import { userSearchAbleFields } from "./user.constant";
import { IAuthUser, IPaginationOptions } from "./user.interface";
import { Admin, Cr, Prisma, Student, Teacher, UserRole, UserStatus } from '@prisma/client';

// ---------------- CREATE ADMIN ----------------
const createAdmin = async (req: Request): Promise<Admin> => {
    const file = req.file;
    if (file) {
        const uploaded = await fileUploader.uploadToCloudinary(file);
        req.body.admin.profilePhoto = uploaded?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email: req.body.admin.email,
                password: hashedPassword,
                role: UserRole.ADMIN,
                needPasswordChange: false,
                status: UserStatus.ACTIVE,
            },
        });

        const createdAdmin = await tx.admin.create({
            data: {
                ...req.body.admin,
                userId: user.id,
            },
        });

        return createdAdmin;
    });

    return result;
};

// ---------------- CREATE TEACHER ----------------
const createTeacher = async (req: Request): Promise<Teacher> => {
    const file = req.file;
    if (file) {
        const uploaded = await fileUploader.uploadToCloudinary(file);
        req.body.teacher.profilePhoto = uploaded?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email: req.body.teacher.email,
                password: hashedPassword,
                role: UserRole.TEACHER,
                needPasswordChange: false,
                status: UserStatus.ACTIVE,
            },
        });

        const createdTeacher = await tx.teacher.create({
            data: {
                ...req.body.teacher,
                userId: user.id,
            },
        });

        return createdTeacher;
    });

    return result;
};

// ---------------- CREATE STUDENT ----------------
const createStudent = async (req: Request): Promise<Student> => {
    const file = req.file;
    if (file) {
        const uploaded = await fileUploader.uploadToCloudinary(file);
        req.body.student.profilePhoto = uploaded?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email: req.body.student.email,
                password: hashedPassword,
                role: UserRole.STUDENT,
                needPasswordChange: false,
                status: UserStatus.ACTIVE,
            },
        });

        const createdStudent = await tx.student.create({
            data: {
                ...req.body.student,
                userId: user.id,
            },
        });

        return createdStudent;
    });

    return result;
};

// ---------------- CREATE CR ----------------
const createCr = async (req: Request): Promise<Cr> => {
    const file = req.file;
    if (file) {
        const uploaded = await fileUploader.uploadToCloudinary(file);
        req.body.cr.profilePhoto = uploaded?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email: req.body.cr.email,
                password: hashedPassword,
                role: UserRole.CR,
                needPasswordChange: false,
                status: UserStatus.ACTIVE,
            },
        });

        const createdCr = await tx.cr.create({
            data: {
                ...req.body.cr,
                userId: user.id,
            },
        });

        return createdCr;
    });

    return result;
};

// ---------------- GET ALL USERS ----------------
const getAllFromDB = async (params: any, options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andConditions: Prisma.UserWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: userSearchAbleFields.map(field => ({
                [field]: { contains: searchTerm, mode: 'insensitive' }
            }))
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: { equals: (filterData as any)[key] }
            }))
        });
    }

    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    const data = await prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
        include: { admin: true, teacher: true, student: true, cr: true },
    });

    const total = await prisma.user.count({ where: whereConditions });

    return { meta: { page, limit, total }, data };
};

// ---------------- CHANGE PROFILE STATUS ----------------
const changeProfileStatus = async (id: string, status: UserStatus) => {
    return prisma.user.update({ where: { id }, data: { status } });
};

// ---------------- GET MY PROFILE ----------------
const getMyProfile = async (user: IAuthUser) => {
    return prisma.user.findUniqueOrThrow({
        where: { email: user.email },
        include: { admin: true, teacher: true, student: true, cr: true },
    });
};

// ---------------- UPDATE MY PROFILE ----------------
const updateMyProfile = async (user: IAuthUser, req: Request) => {
    const file = req.file;
    if (file) {
        const uploaded = await fileUploader.uploadToCloudinary(file);
        req.body.profilePhoto = uploaded?.secure_url;
    }

    const userInfo = await prisma.user.findUniqueOrThrow({ where: { email: user.email } });
    let updatedProfile;

    switch (userInfo.role) {
        case UserRole.ADMIN:
            updatedProfile = await prisma.admin.update({
                where: { userId: userInfo.id },
                data: req.body,
            });
            break;
        case UserRole.TEACHER:
            updatedProfile = await prisma.teacher.update({
                where: { userId: userInfo.id },
                data: req.body,
            });
            break;
        case UserRole.STUDENT:
            updatedProfile = await prisma.student.update({
                where: { userId: userInfo.id },
                data: req.body,
            });
            break;
        case UserRole.CR:
            updatedProfile = await prisma.cr.update({
                where: { userId: userInfo.id },
                data: req.body,
            });
            break;
    }

    return updatedProfile;
};

export const userService = {
    createAdmin,
    createTeacher,
    createStudent,
    createCr,
    getAllFromDB,
    changeProfileStatus,
    getMyProfile,
    updateMyProfile,
};
