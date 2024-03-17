import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});

export { app };
