import * as dotenv from "dotenv";
dotenv.config({path:__dirname+'/.env'});
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.PORT),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: "training",
    entities: ["dist/src/entity/*.js"],
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ["dist/src/db/migrations/*.js"]
})

export default dataSource