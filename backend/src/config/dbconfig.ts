import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
        require: true,
        rejectUnauthorized: false, 
        },
    },
    logging: false,
});

export const connectToDatabase = async():Promise<void> => {
    try {
        await sequelize.authenticate();
        //Initialize the models
      //   initializeModels(sequelize);

        //sync all models
        await sequelize.sync({ alter: true});
        console.error("Connected to the database:");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
};


export default sequelize;