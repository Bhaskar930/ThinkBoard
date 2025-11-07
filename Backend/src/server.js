import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(rateLimiter);

app.use("/api", notesRouter);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port ", PORT);
  });
});
