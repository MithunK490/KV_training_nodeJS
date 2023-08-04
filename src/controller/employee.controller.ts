import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import Address from "../entity/address.entity";
import { plainToInstance } from "class-transformer";
import CreateEmployee from "../dto/create-employee.dto";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import createAddressDto from "../dto/create-address.dto";

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getAnEmployeeById);
        this.router.post("/", this.createEmployee);
        this.router.delete("/:id",this.deleteEmployee)
    }

    getAllEmployees = async (req: express.Request, res: express.Response) => {
        const employee = await this.employeeService.getAllEmployees();
        res.status(200).send(employee);
    }
    getAnEmployeeById = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction) => {
        try {
            const employeeId: number = Number(req.params.id);
            const employee = await this.employeeService.getAnEmployeeById(employeeId);
            res.status(200).send(employee);
        }
        catch (error) {
            next(error);
        }
    }

    createEmployee = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const email: string = req.body.email;
            const name: string = req.body.name;
            const address: Address = req.body.address;
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto)
            if(errors.length>0){
                console.log(JSON.stringify(errors));
            }

            const employee = await this.employeeService.createEmployee(email, name, address);
            res.status(200).send(employee);
        }
        catch(err){
            next(err);
        }
    }

    deleteEmployee = async (req: express.Request, res: express.Response) => {
        const employeeId: number = Number(req.params.id);
        const employee = await this.employeeService.deleteEmployee(employeeId);
        res.status(200).send(employee);
    }
}

export default EmployeeController;