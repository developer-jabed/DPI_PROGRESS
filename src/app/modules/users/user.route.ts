import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = express.Router();

// ---------------- CREATE STUDENT ----------------
router.post(
  "/create-student",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createStudentValidationSchema.parse(req.body);
    return UserController.createUser(req, res, next);
  }
);

// ---------------- CREATE TEACHER ----------------
router.post(
  "/create-teacher",
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createTeacherValidationSchema.parse(req.body);
    return UserController.createUser(req, res, next);
  }
);

// ---------------- CREATE ADMIN ----------------
router.post(
  "/create-admin",
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminValidationSchema.parse(req.body);
    return UserController.createUser(req, res, next);
  }
);

// ---------------- CREATE CR ----------------
router.post(
  "/create-cr",
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createCRValidationSchema.parse(req.body);
    return UserController.createUser(req, res, next);
  }
);

// ---------------- GET USERS ----------------
router.get("/users", UserController.getUsers);

export const userRoutes = router;
