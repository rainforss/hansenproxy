import express from "express";
import cors from "cors";
import ordersRoute from "./routes/index.js";
import dotenv from "dotenv";

const Main = async () => {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("*", ordersRoute);
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started at port ${process.env.PORT || 5000}`);
  });
};

Main().catch((error) => console.log(error));
