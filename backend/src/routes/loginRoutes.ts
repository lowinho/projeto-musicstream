import { Router } from 'express';
import { LoginController } from "../controller/LoginController";

const loginRoutes = Router();
const loginController = new LoginController();

loginRoutes.post("/", loginController.store);
loginRoutes.put("/change/:id", loginController.changePassword);

export { loginRoutes };
