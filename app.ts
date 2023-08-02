import express from "express";
import employeeRouter from "./employee_router";
import Employee from "./Employee";
import loggerMiddleware from "./loggerMiddleware";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees', employeeRouter);

server.listen(3000, () => {
    console.log("Server is listening to 3000");
})