import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';

const prisma = new PrismaClient()

interface IAuthor {
    id?: number
    name: string
}

class AuthorService {
    async index(id: number) {
        const author = prisma.author.findUnique({
            where: {
                id: id,
              },
        });
        return author;
    }

    async show() {
        const author = prisma.author.findMany();
        return author;
    }

    async store({ name } : IAuthor) {
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
        
        const author = await prisma.author.create({
            data: {
                name,
            },
          })
        return author;
    }

    async update(id, data) {
        const author = await prisma.author.update({
            where: {
                id: id,
              },
              data: {
                name: data.name,
              },
          })
          return author;
    }  
}

export { AuthorService };