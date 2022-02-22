import { Request, Response } from "express";
import { AvatarService } from '../services/AvatarService';

class AvatarController {

    async index(req: Request, res: Response) {
        const { id } = req.params;
        const avatarService = new AvatarService();
        try {
            const avatar = await avatarService.index(parseInt(id));
            return res.json(avatar)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
    
    // async show(req: Request, res: Response) {
    //     const avatarService = new AvatarService();
    //     try {
    //         const avatar = await avatarService.show();
    //         return res.json(avatar)
    //     } catch (err) {
    //         return res.status(400).json({
    //             message: err.message,
    //         })
    //     }
    // }

    async store(req: Request, res: Response) {
        const { id } = req.params;
        const params = req.file;
        const avatarService = new AvatarService();
        try { 
          const file = await avatarService.store(parseInt(id), params);
          return res.json(file);
        } catch (err) {
          res.status(400).json({ 
            message: err.message 
          });
        }
    }

    // async update(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const data = req.body;
    //     const avatarService = new AvatarService();
    //     try {
    //         const avatar = await avatarService.update(parseInt(id), data);
    
    //         return res.json(avatar)
            
    //     } catch (err) {
    //         return res.status(400).json({
    //             message: err.message,
    //         })
    //     }
    // }
}

export { AvatarController };