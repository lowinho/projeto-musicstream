import { Request, Response } from "express";
import { MyListService } from '../services/MyListService';

class MyListController {

    async index(req: Request, res: Response) {
        const { id } = req.params;
        const myListService = new MyListService();
        try {
            const settings = await myListService.index(parseInt(id));
            return res.json(settings)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async show(req: Request, res: Response) {
        const myListService = new MyListService();
        try {
            const settings = await myListService.show();
            return res.json(settings)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
            const { userId, musicId } = req.body;
            const myListService = new MyListService();
            try {
                const settings = await myListService.store({ userId, musicId });
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
        const myListService = new MyListService();
        try {
            const settings = await myListService.update(parseInt(id), data);
    
            return res.json(settings)
            
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
}

export { MyListController };