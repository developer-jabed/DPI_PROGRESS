import { UserRole, UserStatus } from "@prisma/client";

export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// Optional filters passed from query
export interface IUserFilters {
    searchTerm?: string;
    role?: UserRole;
    status?: UserStatus;
    email?: string;
}

// Authenticated user type for request
export interface IAuthUser {
    id: string;
    email: string;
    role: UserRole;
}
