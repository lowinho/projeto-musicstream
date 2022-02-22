import { Router } from 'express';
import { GenreController } from "../controller/GenreController";

const genreRoutes = Router();
const genreController = new GenreController();

genreRoutes.get("/:id", genreController.index);
genreRoutes.get("/", genreController.show);
genreRoutes.post("/", genreController.store);
genreRoutes.put("/:id", genreController.update);

export { genreRoutes };
