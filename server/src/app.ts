import express, { Request, Response, Application } from "express";
import cors from 'cors';
import petRouter from "./routers/pet.routes";
import { Code } from "./enum/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enum/status.enum";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

export class App {
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'Application is running on port';
    private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server.';
    private dataSource!: DataSource;

    constructor(private readonly port: (string | number) = process.env.PORT || 3000) {
        this.app = express();
        this.middleWare();
        this.routes();
        this.connect();
    }

    listen(): void {
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} ${this.port}`);
    }

    connect(): void {
        this.dataSource = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ["src/entity/*.ts"],
            logging: true,
            synchronize: true,
        });
        this.dataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            });
    }

    private middleWare(): void {
        this.app.use(cors({
            credentials: true,
            origin: '*'
        }));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/pets', petRouter);
        this.app.get('/', (_: Request, res: Response)=> res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Server is up')));
        this.app.all('*', (_: Request, res: Response)=> res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
    }
}