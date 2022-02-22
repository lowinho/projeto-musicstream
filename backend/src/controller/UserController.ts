import { Request, Response } from "express";
import { UserService } from '../services/UserService';

class UserController {

    async index(req: Request, res: Response) {
        const { id } = req.params;
        const userService = new UserService();
        try {
            const settings = await userService.index(parseInt(id));
            return res.json(settings)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async findByEmail(req: Request, res: Response) {
        const { email } = req.body;
        const userService = new UserService();
        try {
            const settings = await userService.findByEmail(email);
            return res.json(settings)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
    

    async show(req: Request, res: Response) {
        const userService = new UserService();
        try {
            const settings = await userService.show();
            return res.json(settings)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
            const { 
                email,
                password,
                admin
             } = req.body;
            const userService = new UserService();
            try {
                const settings = await userService.store(
                    { 
                        email,
                        password,
                        admin
                     }
                    );
                return res.json(settings)
            } catch (err) {
                return res.status(400).json({
                    message: err.message,
                })
            }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const userService = new UserService();
        try {
            const settings = await userService.update(parseInt(id), data);
    
            return res.json(settings)
            
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async uploadFile(req: any, res: Response): Promise<Response> {
        const { id } = req.params;
        const params = req.file;
        const userService = new UserService();
        try { 
          const file = await userService.uploadFiles(parseInt(id), params);
          return res.json(file);
        } catch (err) {
          res.status(400).json({ 
            message: err.message 
          });
        }
      }

      async getAvatar(req: Request, res: Response) {
        const { id } = req.params;
        const userService = new UserService();
        try {
            const settings = await userService.index(parseInt(id));
            return res.json(settings)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
}

export { UserController };