import express from "express";
import { groupController } from "./group.controller";

const router = express.Router();

router.post("/create", groupController.createGroup);
router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);

export const groupRoutes = router;
