import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';

const prisma = new PrismaClient()

interface IMyListCreate {
    id?: number
    userId: number
    musicId: number
}

class MyListService {
    async index(id: number) {
        const mylist = prisma.myListUser.findUnique({
            where: {
                id: id,
              },
              include: {
                user: true,
                music: true
            }
        });
        return mylist;
    }

    async show() {
        const mylist = prisma.myListUser.findMany({
            include: {
                user: true,
                music: true
            }
        });
        return mylist;
    }

    async store({ userId, musicId } : IMyListCreate) {
        const schema = Yup.object().shape({
            userId: Yup.number().required(),
            musicId: Yup.number().required(),
          });

          if (!(await schema.isValid({ userId, musicId }))) {
            throw new CustomError({
              code: 'VALIDATION_FAILS',
              message: 'Validation fails',
              status: 400,
            });
          }

        const mylist = await prisma.myListUser.create({
            data: {
                userId,
                musicId
            },
          })
        return mylist;
    }

    async update(id, data) {
        const mylist = await prisma.myListUser.update({
            where: {
                id: id,
              },
              data: {
                userId: data.userId,
                musicId: data.musicId
              },
          })
          return mylist;
    }  
}

export { MyListService };