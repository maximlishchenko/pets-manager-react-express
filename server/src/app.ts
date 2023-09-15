import express, { Request, Response, Application, Express } from "express";
import cors from 'cors';
import petRouter from "./routers/pet.routes";
const errorMiddleware = require("./middlewares/error-middleware");

const app: Express = express();
app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(express.json());
app.use('/api/pet', petRouter);
app.use(errorMiddleware);

export default app;