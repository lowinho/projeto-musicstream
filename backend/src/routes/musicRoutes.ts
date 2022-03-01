import { Router } from 'express';
import { MusicController } from "../controller/MusicController";
import { checkJwt } from "../middleware/auth";

const musicRoutes = Router();
const musicController = new MusicController();

// musicRoutes.get("/:id", checkJwt, musicController.index);
musicRoutes.get("/:id", musicController.index);
musicRoutes.get("/", musicController.show);
musicRoutes.post("/", musicController.store);
musicRoutes.put("/:id", musicController.update);
musicRoutes.get("/genre/:id", musicController.getByGenre);

export { musicRoutes };
