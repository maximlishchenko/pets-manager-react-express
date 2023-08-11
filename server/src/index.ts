import app from './app';
import dotenv from 'dotenv';
import { dataSource } from './db/data-source';
dotenv.config();

const PORT = process.env.PORT || 3000;

const start = () => {
    try {
        dataSource.initialize()
            .then(() => {
                console.log('Data source has been initialized');
            })
            .catch((e) => {
                console.log(e);
            });
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
