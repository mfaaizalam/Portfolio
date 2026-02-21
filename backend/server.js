import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import ContactRoute from './routes/Contact.route.js';
import cors from 'cors';
const app = express();


const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', ContactRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})