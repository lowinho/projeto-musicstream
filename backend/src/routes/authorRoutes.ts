import { Router } from 'express';
import { AuthorController } from "../controller/AuthorController";

const authorRoutes = Router();
const authorController = new AuthorController();

authorRoutes.get("/:id", authorController.index);
authorRoutes.get("/", authorController.show);
authorRoutes.post("/", authorController.store);
authorRoutes.put("/:id", authorController.update);

export { authorRoutes };
