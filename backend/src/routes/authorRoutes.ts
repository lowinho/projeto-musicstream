import { Router } from 'express';
import { AuthorController } from "../controller/AuthorController";
import { checkJwt } from "../middleware/auth";

const authorRoutes = Router();
const authorController = new AuthorController();

authorRoutes.get("/:id", checkJwt, authorController.index);
authorRoutes.get("/", checkJwt, authorController.show);
authorRoutes.post("/", checkJwt, authorController.store);
authorRoutes.put("/:id", checkJwt, authorController.update);

export { authorRoutes };
