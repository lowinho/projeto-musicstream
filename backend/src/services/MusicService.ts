import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';

const prisma = new PrismaClient()

interface IMusicCreate {
    id?: number
    authorId: number;
    authorName?: string;
    album: string;
    genreName?: string;
    genreId: number;
    description: string;
    link: string;
    like: boolean;
}

class MusicService {
    async index(id: number) {
        const music = prisma.music.findUnique({
            where: {
                id: id,
              },
            include: {
                author: true,
                genre: true
            }
        });
        return music;
    }

    async show() {
        const music = prisma.music.findMany({
            include: {
                author: true,
                genre: true
            }
        });
        return music;
    }

    async store(params : IMusicCreate) {
    
        // const schema = Yup.object().shape({
        //     authorId: Yup.number().required(),
        //     album: Yup.string().required(),
        //     genreId: Yup.number().required(),
        //     description: Yup.string().required().max(1024),
        //     link: Yup.string().required(),
        //     like: Yup.boolean(),
        // });

        // if (!(await schema.isValid(params))) {
        //     throw new CustomError({
        //       code: 'VALIDATION_FAILS',
        //       message: 'Validation fails',
        //       status: 400,
        //     });
        // }

        const authorId = params.authorId;
        const album = params.album;
        const genreId = params.genreId;
        const description = params.description;
        const link = params.link;
        const like = params.like;

        const music = await prisma.music.create({
            data: {
                authorId,
                album,
                genreId,
                description,
                link,
                like
            },
          })
        return music;
    }

    async update(id, data) {
        const music = await prisma.music.update({
            where: {
                id: id,
              },
              data: {
                authorId: data.authorId,
                album: data.album,
                genreId: data.genreId,
                description: data.description,
                link: data.link,
                like: data.like
              },
          })
          return music;
    }  
}

export { MusicService };