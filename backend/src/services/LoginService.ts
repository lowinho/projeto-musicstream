import { PrismaClient } from '@prisma/client';
import * as jwt from "jsonwebtoken";
import { CustomError } from 'express-handler-errors';
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';

import authConfig from '../config/auth';

const prisma = new PrismaClient()

interface ILoginCreate {
    id?: number
    email?: string;
    password?: string;
}

class LoginService {
    async store(params: ILoginCreate) {
        if (!(params.email && params.password)) {
          throw new CustomError({
            code: 'DATA_NOT_REPORTED',
            message: 'Data not reported',
            status: 401,
          });
        }
    
        try {
          const user = prisma.user.findUnique({
          where: {
            email: params.email,
          },
        });

        const password = (await user).password_hash;
        const password_compare = compareSync(params.password, password);
        
 
        if (!password_compare) {
          throw new CustomError({
            code: 'INCORRECT PASSWORD',
            message: 'Incorrect Password',
            status: 401,
          });
        }

        const authUser = (await user);

        const token = {
          user: {
            id: authUser.id,
            email: authUser.email
          },
          token: jwt.sign(
          { id: authUser.id },
          authConfig.secret,
          { expiresIn: authConfig.expiresIn }
        )};
    
        return token;
        } catch {
          throw new CustomError({
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            status: 404,
          });
        }
    
        
      }
    
      async changePassword(id: string, params: any) {
        const { oldPassword, newPassword } = params;

        if (!(oldPassword && newPassword)) {
          throw new CustomError({
            code: 'DATA_NOT_REPORTED',
            message: 'Data not reported',
            status: 401,
          });
        }
    
        try {
          const user = prisma.user.findUnique({
            where: {
              id: parseInt(id),
            },
          });

          const dbUser = (await user);
          const password = dbUser.password_hash;
          const password_compare = compareSync(oldPassword, password);

          console.log('compare', password_compare);

          if (!password_compare) {
            throw new CustomError({
              code: 'INCORRECT OLD PASSWORD',
              message: 'Old Password Incorrect',
              status: 401,
            });
          }
          const email = dbUser.email;
          const admin = dbUser.admin;
          const salt = genSaltSync(10);
          const password_hash = hashSync(newPassword, salt);
          
          const saveUser = await prisma.user.update({
              where: {
                id: parseInt(id)
              },
              data: {
                  email,
                  password_hash,
                  admin
              },
            });
          return saveUser;
        } catch {
          throw new CustomError({
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            status: 404,
          });
        }
      }
}

export { LoginService };