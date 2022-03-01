import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';
import { hashSync, hash, genSaltSync } from 'bcryptjs';
import appConfig from '../config/appConfig';

const prisma = new PrismaClient()

// interface IAvatar {
//     id?: number;
//     musicId: number;
//     filename?: string;
//     originalname?: string;
//     destination?: string;
// }

class CoverAlbumService {
    async index(id: number) {
      const cover = await prisma.cover.findMany({
        where: {
          musicId: id,
        },
        include: {
          music: true
        }
    });
    return cover;
    }

    // async show() {
    //     const cover = prisma.cover.findMany();
    //     return cover;
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
          const url = `${appConfig.url}/images/cover/${params.filename}`;
          const musicId = id;

          const cover = await prisma.cover.create({
            data: {
                fileName,
                originalName,
                url,
                musicId
            },
          });
        return cover;
      } catch (e) {
        throw new CustomError({
            code: 'ERROR_SAVE_IMAGE',
            message: e,
            status: 400,
          });
      }
       
    }

    // async update(id: number, data: any) {
    //     const password_hash = hash(data.password, 8);
    //     const cover = await prisma.cover.update({
    //         where: {
    //             id: id,
    //           },
    //           data: {
    //             email: data.email,
    //             password_hash: password_hash,
    //             admin: data.admin
    //           },
    //       })
    //       return cover;
    // }

    async getByMusic(id: number) {
      const music = prisma.cover.findMany({
          where: {
              musicId: id,
            },
          include: {
              music: true
          }
      });
      return music;
  }
}

export { CoverAlbumService };