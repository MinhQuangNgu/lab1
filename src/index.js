import express,{json} from 'express';
import { config } from 'dotenv';
import appRouter from './routers/index.js';
import dbConnect from './database/database.js';
config();

const app = express();
app.use(json());
appRouter(app);


const PORT = process.env.PORT || 9999;
app.listen(PORT,async () => {
    await dbConnect();
    console.log("Connecting to PORT",PORT);
})