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

    async store({ 
        authorId,
        album,
        genreId,
        description,
        link,
        like 
    } : IMusicCreate) {
        const schema = Yup.object().shape({
            authorId: Yup.number().required(),
            album: Yup.string().required(),
            genreId: Yup.string().required(),
            description: Yup.string().required().max(1024),
            link: Yup.string().required(),
            like: Yup.boolean().required(),
        });

        if (!(await schema.isValid({
            authorId,
            album,
            genreId,
            description,
            link,
            like 
        }))) {
            throw new CustomError({
              code: 'VALIDATION_FAILS',
              message: 'Validation fails',
              status: 400,
            });
        }

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