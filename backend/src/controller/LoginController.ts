import { Request, Response } from "express";
import { LoginService } from '../services/LoginService';

class LoginController {

    async store (req: Request, res: Response): Promise<Response> {
        const _user = req.body;
        const loginService = new LoginService();
        try {
          const response = await loginService.store(_user);
          return res.json(response);
        } catch (e) {
          return res.status(e.error.status).json(e.error.message);
        }
      }
    
      async changePassword (req: Request, res: Response): Promise<Response> {
        // const id = res.locals.jwtPayload.userId;
        const { id } = req.params;
        const _user = req.body;
        const loginService = new LoginService();
    
        try {
          const response = await loginService.changePassword(id, _user);
          return res.status(204).json();
        } catch (e) {
          return res.status(e.error.status).json(e.error.message);
        }
      }

}

export { LoginController };