import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import mongoConnection from './config/mongo_database'

(async function () {
    await mongoConnection.connectDB()
    console.log(mongoConnection.connectDB);
})()


class App {
    public express
    constructor() {
        this.express = express()
        this.defaults()
    }
    private defaults(): void {
        this.express.use(function (req: Request, res: Response, next: NextFunction) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,Authorization,Access-Token,Refresh-Token,User-Agent,Browser');
            res.setHeader('Access-Control-Expose-Headers', 'Origin,X-Requested-With,content-type,Authorization,Access-Token,Refresh-Token,User-Agent,Browser');
            next();
        })
            .use(express.urlencoded({ extended: false }))
            .use(express.json({ type: '*/*' }))
            .use(express.raw())
            .use(router)
    }
}

export default new App().express

