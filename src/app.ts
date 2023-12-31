
import * as dotenv from "dotenv";
dotenv.config({path:__dirname+'/.env'});
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db";
import employeeRoute from "./route/employee.route";
import errorMiddleware from "./middleware/error.middleware";
import departmentRoute from "./route/department.route";
import authorize from "./middleware/authorize.middleware";
import { Role } from "./utils/role.enum";
// import Employee from "./Employee";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees', employeeRoute);
server.use('/department', departmentRoute)
server.get('/roles', (req:express.Request, res:express.Response)=>{
    return res.status(200).json({data:Object.values(Role)})
})
// server.use((error:Error, req:Request, res:Response, next:NextFunction ) => {
//         console.log(error);
//         res.status(500).send(error.message);
//     });

server.use(errorMiddleware);

(async () => {
    await dataSource.initialize();
    server.listen(3000, () => {
        console.log("Server is listening to 3000");
    });

})();
