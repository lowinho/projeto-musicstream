import { Router } from 'express';
import { MyListController } from "../controller/MyListController";
import { checkJwt } from "../middleware/auth";

const mylistRoutes = Router();
const mylistController = new MyListController();

mylistRoutes.get("/:id", checkJwt, mylistController.index);
mylistRoutes.get("/", checkJwt, mylistController.show);
mylistRoutes.post("/", checkJwt, mylistController.store);
mylistRoutes.put("/:id", checkJwt, mylistController.update);

export { mylistRoutes };
