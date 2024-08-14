const express = require("express");

const { logReqRes } = require("./middlewares");
const { connectMongodb } = require("./views/connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//Connection
connectMongodb("mongodb://localhost:27017/BilalUsman").then(() =>
  console.log("Mongodb connected!")
);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server Started! at port:${PORT}`));
