import User from "../models/user.model";
import { UserAttributes } from "../types/user.types";
import bcrypt from 'bcryptjs';

class UserRepository {
   async findByEmail(email: string): Promise<User | null> {
      return await User.findOne({where:{email}});
   }

   async createUser(userData: Omit<UserAttributes, "id">): Promise<User> {
      const {fullName, email, password} = userData;

      return await User.create({
         fullName,
         email,
         password
      });
   }

   async findByEmailAndPassword(email:string, password:string): Promise<User | null> {
      const user = await User.findOne({
         where: { email },
         attributes: {include: ['password'] }
      });

      if(!user) return null;

      if(user){
         const isPasswordValid = bcrypt.compareSync(password, user.password);
         if(!isPasswordValid) return null;
      }

      return user;
   }
}

export default new UserRepository();