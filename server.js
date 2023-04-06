import dotenv from 'dotenv'
import  express  from 'express' 
import cors from 'cors'

import dbconnect from './config/connectDb.js';
import userRoute from './route/userRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user",userRoute)

const init = async () => {
    await dbconnect();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}

init();