import { Request, Response } from "express";
import { CoverAlbumService } from '../services/CoverAlbumService';

class CoverAlbumController {

    async index(req: Request, res: Response) {
        const { id } = req.params;
        const coverAlbumService = new CoverAlbumService();
        try {
            const cover = await coverAlbumService.index(parseInt(id));
            return res.json(cover)
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
    
    // async show(req: Request, res: Response) {
    //     const coverAlbumService = new CoverAlbumService();
    //     try {
    //         const cover = await coverAlbumService.show();
    //         return res.json(cover)
    //     } catch (err) {
    //         return res.status(400).json({
    //             message: err.message,
    //         })
    //     }
    // }

    async store(req: Request, res: Response) {
        const { id } = req.params;
        const params = req.file;
        const coverAlbumService = new CoverAlbumService();
        try { 
          const file = await coverAlbumService.store(parseInt(id), params);
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
    //     const coverAlbumService = new CoverAlbumService();
    //     try {
    //         const cover = await coverAlbumService.update(parseInt(id), data);
    
    //         return res.json(cover)
            
    //     } catch (err) {
    //         return res.status(400).json({
    //             message: err.message,
    //         })
    //     }
    // }
}

export { CoverAlbumController };