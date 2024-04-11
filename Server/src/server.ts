import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || "3001";

const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  console.error("DB_URL not specified in .env file");
  process.exit(1);
}

mongoose
  .connect(dbUrl)
  .then(() => {
    app.use("/api/auth", userRoutes);

    console.log("DB Connection Successful");
    app.listen(port, () => {
      console.log(`The application is listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });
