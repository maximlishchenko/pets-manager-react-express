import { DataSource } from "typeorm";

export class DbConnection {

    private static instance: DbConnection | null = null;
    dataSource!: DataSource;

    private constructor() {
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
    }

    public static getInstance(): DbConnection {
        if (!DbConnection.instance) {
            DbConnection.instance = new DbConnection();
        }
        return DbConnection.instance;
    }

    init(): void {
        this.dataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            });
    }



}