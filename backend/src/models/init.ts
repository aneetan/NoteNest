import { Sequelize } from "sequelize";
import Notes from "./note.model";
import User from "./user.model";

interface Models {
   User: typeof User;
   Notes: typeof Notes;
}

   
export function  initializeModels(sequelize: Sequelize): Models {
   const models: Models = {
      User: User.initialize(sequelize),
      Notes: Notes.initialize(sequelize)
   }

   //set up associations
   Object.values(models).forEach(model => {
      if(model.associate){
         model.associate(models);
      }
   })

   return models;
}

export type {Models}