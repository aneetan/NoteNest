import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/dbconfig';
import authRouter from './routes/auth.routes';
import noteRouter from './routes/notes.routes';

require('dotenv').config();

const app = express();
const PORT = 3000;


//Middleware
app.use(cors());
app.use(express.json());

connectToDatabase()
    .then(() => {
        //routes
        app.use('/auth', authRouter);
        app.use('/task', noteRouter)

        app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))  
    })
    .catch((e) => {
        console.log("Failed to initialize application", e);
    })

 