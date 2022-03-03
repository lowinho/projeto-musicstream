import { Router } from 'express';
import { AvatarController } from "../controller/AvatarController";
import multer from "multer";
import multerConfig from "../config/avatarMulterConfig";
import { checkJwt } from "../middleware/auth";

const upload = multer(multerConfig).single("file");

const avatarRoutes = Router();
const avatarController = new AvatarController();

avatarRoutes.get("/:id",checkJwt, avatarController.index);
// avatarRoutes.get("/",checkJwt, avatarController.show);
avatarRoutes.post("/:id", upload, checkJwt, avatarController.store);
// avatarRoutes.put("/:id", checkJwt, avatarController.update);

export { avatarRoutes };
