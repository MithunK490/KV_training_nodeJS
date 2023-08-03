import "reflect-metadata";
import express from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db";
import employeeRoute from "./route/employee.route";
// import Employee from "./Employee";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees', employeeRoute);

(async () => {
    await dataSource.initialize();
    server.listen(3000, () => {
        console.log("Server is listening to 3000");
    });

})();
