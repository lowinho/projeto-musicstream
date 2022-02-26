import { Request, Response } from "express";
import { AuthorService } from '../services/AuthorService';

class AuthorController {

    async index(req: Request, res: Response) {
        const { id } = req.params;
        const authorService = new AuthorService();
        try {
            const author = await authorService.index(parseInt(id));
            return res.json(author)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async show(req: Request, res: Response) {
        const authorService = new AuthorService();
        try {
            const author = await authorService.show();
            return res.json(author)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
        const { name } = req.body.params;
        const authorService = new AuthorService();
        try {

            
            const author = await authorService.store({ name });
            console.log(author)
            return res.json(author)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        console.log('name', id);
        const data = req.body;
        const authorService = new AuthorService();
        try {
            const author = await authorService.update(parseInt(id), data);
    
            return res.json(author)
            
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
}

export { AuthorController };