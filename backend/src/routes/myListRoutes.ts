import { Router } from 'express';
import { MyListController } from "../controller/MyListController";

const mylistRoutes = Router();
const mylistController = new MyListController();

mylistRoutes.get("/:id", mylistController.index);
mylistRoutes.get("/", mylistController.show);
mylistRoutes.post("/", mylistController.store);
mylistRoutes.put("/:id", mylistController.update);

export { mylistRoutes };
