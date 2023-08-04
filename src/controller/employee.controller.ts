import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import Address from "../entity/address.entity";
import { plainToInstance } from "class-transformer";
import CreateEmployee from "../dto/create-employee.dto";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import createAddressDto from "../dto/create-address.dto";
import authenticate from "../middleware/auithentication.middleware";
import authorize from "../middleware/authorize.middleware";

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();

        this.router.get("/", authenticate, this.getAllEmployees)
        this.router.get("/:id", this.getAnEmployeeById);
        this.router.post("/", authenticate, authorize, this.createEmployee);
        this.router.put("/:id", this.updateEmployee)
        this.router.delete("/:id", this.deleteEmployee);
        this.router.post("/login", this.loginEmployee);

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
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto)
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
            }

            const employee = await this.employeeService.createEmployee(
                createEmployeeDto.email,
                createEmployeeDto.name,
                createEmployeeDto.address,
                createEmployeeDto.password,
                createEmployeeDto.role,
            );
            res.status(200).send(employee);
        }
        catch (err) {
            next(err);
        }
    }

    deleteEmployee = async (req: express.Request, res: express.Response) => {
        const employeeId: number = Number(req.params.id);
        const employee = await this.employeeService.deleteEmployee(employeeId);
        res.status(200).send(employee);
    }

    updateEmployee = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const updateEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(updateEmployeeDto)
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
            }

            const employee = await this.employeeService.createEmployee(
                updateEmployeeDto.email,
                updateEmployeeDto.name,
                updateEmployeeDto.address,
                updateEmployeeDto.password,
                updateEmployeeDto.role,
            );
            res.status(200).send(employee);
        }
        catch (err) {
            next(err);
        }
    }

    public loginEmployee = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const { email, password } = req.body;

        try {
            const token = await this.employeeService.loginEmployee(email, password);
            res.status(200).send({ data: token });
        }
        catch (error) {
            next(error);
        }
    }
}

export default EmployeeController;