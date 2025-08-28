import { DataTypes, InitOptions, Model, ModelAttributes } from "sequelize";
import { NoteAttributes } from "../types/note.types";

class Notes extends Model<NoteAttributes, Omit<NoteAttributes, 'noteId'>> implements NoteAttributes {
   public noteId!: number;
   public title!: string;
   public content!: string;
   public user!: string;
   public userId!: number;
   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;

   static initialize(sequelize: any) : typeof Notes {
      const attributes: ModelAttributes<Notes, NoteAttributes> = {
         noteId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
         },
         title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               len: [5, 100]
            }
         },
         content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               min: 5
            }
         },
         user: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'users',
               key: 'id'
            }
         },
         
      };

      const options: InitOptions<Notes> = {
         sequelize,
         modelName: "Notes",
         tableName: "notes",
         timestamps: true,
         paranoid: true
      }

      return Notes.init(attributes, options) as typeof Notes;
   }

   public static associate(models: any){
      Notes.belongsTo(models.User, {
         foreignKey: "userId"
      })
   }
}

export default Notes;