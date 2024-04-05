import express from "express";

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port: string = process.env.PORT || "3001";
app.get("/", (req, res) => {
  res.send(`Server is online`);
});

// Server setup
app.listen(port, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + port
  );
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err: any) => {
    console.log(err.message);
  });
