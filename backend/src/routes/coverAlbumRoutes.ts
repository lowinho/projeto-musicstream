import { Router } from 'express';
import { CoverAlbumController } from "../controller/CoverAlbumController";
import multer from "multer";
import multerConfig from "../config/coverMulterConfig";

const upload = multer(multerConfig).single("file");

const coverAlbumRoutes = Router();
const coverAlbumController = new CoverAlbumController();

coverAlbumRoutes.get("/:id", coverAlbumController.index);
// coverAlbumRoutes.get("/", coverAlbumController.show);
coverAlbumRoutes.post("/:id", upload, coverAlbumController.store);
coverAlbumRoutes.get("/music/:id", coverAlbumController.getByMusic);
// coverAlbumRoutes.put("/:id", coverAlbumController.update);

export { coverAlbumRoutes };
