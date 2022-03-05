import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';
import appConfig from '../config/appConfig';

const prisma = new PrismaClient()

// interface IAvatar {
//     id?: number;
//     userId: number;
//     filename?: string;
//     originalname?: string;
//     destination?: string;
// }

class AvatarService {
  async index(id: number) {
    const avatar = await prisma.avatar.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true
      }
  });
  return avatar;
  }

  // async show() {
  //     const avatar = prisma.avatar.findMany();
  //     return avatar;
  // }

  async store(id: number, params: any) {
    if (!params.filename) {
      throw new CustomError({
        code: 'FILE_NOT_FOUND',
        message: 'File not found',
        status: 400,
      });
    }

    try {
        const fileName = params.filename;
        const originalName = params.originalname;
        const url = `${appConfig.url}/images/avatar/${params.filename}`;
        const userId = id;

        console.log(id)
        
        const avatar = await prisma.avatar.create({
          data: {
              fileName,
              originalName,
              url,
              userId
          },
        });
      return avatar;
    } catch (e) {
      throw new CustomError({
          code: 'ERROR_SAVE_IMAGE',
          message: e,
          status: 400,
        });
    }
      
  }

  async update(id: number, params: any) {
    if (!params.filename) {
      throw new CustomError({
        code: 'FILE_NOT_FOUND',
        message: 'File not found',
        status: 400,
      });
    }

    try {
        const fileName = params.filename;
        const originalName = params.originalname;
        const url = `${appConfig.url}/images/avatar/${params.filename}`;
        const userId: number = id;

        const avatar = await prisma.avatar.update({
          where: {
            userId: userId,
          },
          data: {
              fileName,
              originalName,
              url,
              userId
          },
        });
      return avatar;
    } catch (e) {
      throw new CustomError({
          code: 'ERROR_SAVE_IMAGE',
          message: e,
          status: 400,
        });
    }
  }

  async getByUser(id: number) {
    const music = prisma.avatar.findMany({
        where: {
            userId: id,
          },
        include: {
            user: true
        }
    });
    return music;
}
}

export { AvatarService };