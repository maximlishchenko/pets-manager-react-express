import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/entity/*.ts"],
    logging: false,
    synchronize: true,
});