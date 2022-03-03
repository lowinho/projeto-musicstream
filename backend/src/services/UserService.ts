import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';
import { hashSync, hash, genSaltSync } from 'bcryptjs';

const prisma = new PrismaClient()

interface IUserCreate {
    id?: number
    name?: string;
    email?: string;
    password?: string;
    admin?: boolean
}

class UserService {
    async index(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
              },
        });
        return user;
    }

    async show() {
        const user = prisma.user.findMany();
        return user;
    }

    async findByEmail( email ) {
        console.log('email', email);
        const user = prisma.user.findUnique({
            where: {
                email: email,
              },
        });
        return user;
    }

    async store( params : IUserCreate) {
        const schema = Yup.object().shape({
            name: Yup.string().required().min(5),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            admin: Yup.boolean().required(),
        });

        if (!(await schema.isValid( params ))) {
            throw new CustomError({
              code: 'VALIDATION_FAILS',
              message: 'Validation fails',
              status: 400,
            });
          }

          const name = params.name;
          const email = params.email;
          const admin = params.admin;

        try {
            const salt = genSaltSync(10);
            const password_hash = hashSync(params.password, salt);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password_hash,
                    admin
                },
              })
            return user;
        } catch(error) {
            throw new CustomError({
                code: 'USER_NOT_CREATED',
                message: `User not created - ${error}`,
                status: 404,
              });
        }
       
    }

    async update(id: number, data: any) {
        const password_hash = hash(data.password, 8);
        const user = await prisma.user.update({
            where: {
                id: id,
              },
              data: {
                email: data.email,
                password_hash: password_hash,
                admin: data.admin
              },
          })
          return user;
    }
    
    async uploadFiles(id: number, params: any) {  

        console.log(params);
    
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
              const url = params.destination;
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

        async getAvatar(id: number) {
          const avatar = await prisma.avatar.findUnique({
              where: {
                id: id,
              },
              include: {
                user: true
              }
          });
          return avatar;
      }
}

export { UserService };