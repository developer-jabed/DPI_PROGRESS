import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    let statusCode: number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;


    if (err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === "P2002"){
            message = "User duplication  , user already exist ",
            error = err.meta,
            statusCode= httpStatus.CONFLICT

        }
        if(err.code === "P1000"){
            message = "Authentication failed against database server",
            error = err.meta
            statusCode= httpStatus.BAD_GATEWAY

        }
        if(err.code === "P2003"){
            message = "Foreign key constraint failed",
            error = err.meta
            statusCode= httpStatus.BAD_REQUEST

        }
        
    }

    else if(err instanceof Prisma.PrismaClientValidationError){
        message= "validation Error ",
        error = error.message
    }
    else if(err instanceof Prisma.PrismaClientUnknownRequestError){
        message= "Unknown prisma error occue ",
        error = error.message
    }
    else if(err instanceof Prisma.PrismaClientInitializationError){
        message= "prisma client failed to initialized",
        error = error.message
    }
    res.status(statusCode).json({
        success,
        message,
        error
    })
};

export default globalErrorHandler;