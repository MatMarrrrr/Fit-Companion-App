import express from "express";

const app = express();
const PORT: Number = 3000;

app.get("/", (req, res) => {
  res.send(`Server is online`);
});

// Server setup
app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});
