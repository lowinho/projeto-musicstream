import { Router } from 'express';
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middleware/auth";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/:id", checkJwt, userController.index);
userRoutes.get("/", checkJwt, userController.show);
userRoutes.get("/email/consult", checkJwt, userController.findByEmail);
userRoutes.post("/", userController.store);
userRoutes.put("/:id", checkJwt, userController.update);

export { userRoutes };
