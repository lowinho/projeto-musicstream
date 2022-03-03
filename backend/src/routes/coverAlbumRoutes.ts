import { Router } from 'express';
import { CoverAlbumController } from "../controller/CoverAlbumController";
import multer from "multer";
import multerConfig from "../config/coverMulterConfig";
import { checkJwt } from "../middleware/auth";

const upload = multer(multerConfig).single("file");

const coverAlbumRoutes = Router();
const coverAlbumController = new CoverAlbumController();

coverAlbumRoutes.get("/:id", checkJwt, coverAlbumController.index);
// coverAlbumRoutes.get("/", coverAlbumController.show);
coverAlbumRoutes.post("/:id", upload, checkJwt, coverAlbumController.store);
coverAlbumRoutes.get("/music/:id", checkJwt, coverAlbumController.getByMusic);
// coverAlbumRoutes.put("/:id", coverAlbumController.update);

export { coverAlbumRoutes };
