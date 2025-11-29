import express from "express";
import { departmentController } from "./department.controller";
import { departmentValidation } from "./department.validation";
import validateRequest from "../../middlewares/validationRequest";

const router = express.Router();

router.post(
  "/create",
  // validateRequest(departmentValidation.createDepartment),
  departmentController.createDepartment
);

router.get("/", departmentController.getAllDepartments);

router.get("/:id", departmentController.getDepartmentById);

router.delete("/:id", departmentController.deleteDepartment);

export const departmentRoutes = router;
