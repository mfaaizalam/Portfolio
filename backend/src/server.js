import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {connectDB} from "./config/db.js";
import ContactRoute from "./routes/Contact.route.js";

dotenv.config();

const app = express();



// CORS (Frontend Vercel + Localhost allowed)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://goldenhorde.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ─────────────────────────────
   ROUTES
───────────────────────────── */

app.use("/api", ContactRoute);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ─────────────────────────────
   SERVER LISTEN
───────────────────────────── */
export default app;