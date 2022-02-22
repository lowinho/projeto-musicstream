import { Router } from 'express';
import { UserController } from "../controller/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/:id", userController.index);
userRoutes.get("/", userController.show);
userRoutes.get("/email/consult", userController.findByEmail);
userRoutes.post("/", userController.store);
userRoutes.put("/:id", userController.update);

export { userRoutes };
