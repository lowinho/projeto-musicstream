import { Request, Response } from "express";
import { MusicService } from '../services/MusicService';

class MusicController {

    async index(req: Request, res: Response) {
        const { id } = req.params;
        const musicService = new MusicService();
        try {
            const music = await musicService.index(parseInt(id));
            return res.json(music)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async show(req: Request, res: Response) {
        const musicService = new MusicService();
        try {
            const music = await musicService.show();
            return res.json(music)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
            let { 
                authorId,
                album,
                genreId,
                description,
                link,
                like
             } = req.body.params;
            const musicService = new MusicService();
            genreId = parseInt(genreId);
            authorId = parseInt(authorId);
            try {
                const music = await musicService.store({ 
                    authorId,
                    album,
                    genreId,
                    description,
                    link,
                    like 
                 });
                return res.json(music)
            } catch (err) {
                return res.status(400).json({
                    message: err.message,
                })
            }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const musicService = new MusicService();
        try {
            const music = await musicService.update(parseInt(id), data);
    
            return res.json(music)
            
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    // async uploadFile(req: any, res: Response): Promise<Response> {

    //     const params = req.file;
    
    //     const anuncianteAnunciante = new AnuncianteAnuncianteService();
    
    //     try { 
    //       const file = await anuncianteAnunciante.uploadFiles(params);
    
    //       return
    
    //       return res.json(file);
    //     } catch (err) {
    //       res.status(400).json({ 
    //         message: err.message 
    //       });
    //     }
    //   }
}

export { MusicController };