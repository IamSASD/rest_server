import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { router } from '../routes/user.routes.js';
dotenv.config();

export class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.user_path = '/api/users'
        //Middlewares
        this.middlewares();
        // App Routes
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //JSON Parse
        this.app.use(express.json());
        // Public Directory
        this.app.use(express.static('public'));
    }

    routes() {
         this.app.use(this.user_path, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${'http://localhost:' + this.port}`);
        });
    }

}