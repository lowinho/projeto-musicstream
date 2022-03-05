import { Request, Response } from "express";
import { GenreService } from '../services/GenreService';

class GenreController {

    async index(req: Request, res: Response) {
        const { id } = req.params;
        const genreService = new GenreService();
        try {
            const genre = await genreService.index(parseInt(id));
            return res.json(genre)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async show(req: Request, res: Response) {
        const genreService = new GenreService();
        try {
            const genre = await genreService.show();
            return res.json(genre)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
        const { name } = req.body;
        const genreService = new GenreService();
        try {
            const genre = await genreService.store({ name });
            return res.json(genre)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const genreService = new GenreService();
        try {
            const genre = await genreService.update(parseInt(id), data);
    
            return res.json(genre)
            
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
}

export { GenreController };