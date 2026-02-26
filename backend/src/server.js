import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import ContactRoute from './routes/Contact.route.js';
import cors from 'cors';
const app = express();

app.use(cors({
    origin:"https://goldenhorde-plum.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}))
connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', ContactRoute);

app.get("/", (req, res) => res.send("Backend is running!"));
// const PORT = process.env.PORT || 3000;

export default app;