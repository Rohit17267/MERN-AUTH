import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();

const PORT = 4000 || process.env.PORT;
connectDB();

const allowedOrigins =['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());

app.use(cors({origin:(origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },credentials: true}));


app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.get('/',(req,res)=> res.send('api is working '));
app.listen(PORT,()=>console.log(`Server in running on http://localhost:${PORT}`));