import { Router } from 'express';
import { GenreController } from "../controller/GenreController";
import { checkJwt } from "../middleware/auth";

const genreRoutes = Router();
const genreController = new GenreController();

genreRoutes.get("/:id", checkJwt, genreController.index);
genreRoutes.get("/", checkJwt, genreController.show);
genreRoutes.post("/", checkJwt, genreController.store);
genreRoutes.put("/:id", checkJwt, genreController.update);

export { genreRoutes };
