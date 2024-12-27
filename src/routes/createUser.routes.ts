import express from "express";
import { Validate } from "../middlewares/validate-zod.middleware";
import { createUserSchema } from "../schemas/user/create-user.schema";
import userController from "../controllers/user.controllers"
import { upload } from "../middlewares/upload-multer.middleware";

const router = express.Router();

router.route("/auth/register").post(upload.single("avatar"),Validate(createUserSchema),userController.createUserController);

export default router;
