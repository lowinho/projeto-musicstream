import { Router } from 'express';
import { AvatarController } from "../controller/AvatarController";
import multer from "multer";
import multerConfig from "../config/avatarMulterConfig";

const upload = multer(multerConfig).single("file");

const avatarRoutes = Router();
const avatarController = new AvatarController();

avatarRoutes.get("/:id", avatarController.index);
// avatarRoutes.get("/", avatarController.show);
avatarRoutes.post("/:id", upload, avatarController.store);
// avatarRoutes.put("/:id", avatarController.update);

export { avatarRoutes };
