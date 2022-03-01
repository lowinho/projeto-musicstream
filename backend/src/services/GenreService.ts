import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';

const prisma = new PrismaClient()

interface IGenre {
    id?: number
    name: string
}

class GenreService {
    async index(id: number) {
        const genre = prisma.genre.findUnique({
            where: {
                id: id,
              },
        });
        return genre;
    }

    async show() {
        const genre = prisma.genre.findMany({
            include: {
                music: true
            }
        });
        return genre;
    }

    async store({ name } : IGenre) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if (!(await schema.isValid({ name }))) {
            throw new CustomError({
              code: 'VALIDATION_FAILS',
              message: 'Validation fails',
              status: 400,
            });
        }

        const genre = await prisma.genre.create({
            data: {
                name,
            },
          })
        return genre;
    }

    async update(id, data) {
        const genre = await prisma.genre.update({
            where: {
                id: id,
              },
              data: {
                name: data.name,
              },
          })
          return genre;
    }  
}

export { GenreService };