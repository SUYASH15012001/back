const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");

const app = express();
app.use(express.json());
const PORT = 8080;

// app.get("/", (req, res) => {
//   res.status(200);
//   res.send("Welcome to root URL of Server");
// });

mongoose.connect(
  "mongodb+srv://123456:123%40Abc@cluster0.yhp404s.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
