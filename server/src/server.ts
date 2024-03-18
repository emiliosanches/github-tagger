import express from "express";
import type { ErrorRequestHandler } from "express";

import cors from "cors";
import { router } from "./router";
import { modules } from "./modules";

const { exceptionHandler } = modules.exception;

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});

app.use(router.getRouter());

app.use(((err, req, res, next) => {
  exceptionHandler.handleException(err, req, res, next);
}) as ErrorRequestHandler);

export { app };
