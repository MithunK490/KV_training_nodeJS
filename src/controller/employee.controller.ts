import express from "express";
import EmployeeService from "../service/employee.service";

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getAnEmployeeById);
        this.router.post("/", this.createEmployee);
    }

    getAllEmployees = async (req: express.Request, res: express.Response) => {
        const employee = await this.employeeService.getAllEmployees();
        res.status(200).send(employee);
    }
    getAnEmployeeById = async (req: express.Request, res: express.Response) => {
        const employeeId: number = Number(req.params.id);
        const employee = await this.employeeService.getAnEmployeeById(employeeId);
        res.status(200).send(employee);
    }

    createEmployee = async (req: express.Request, res: express.Response) => {
        const email: string = req.body.email;
        const name: string = req.body.name;
        const employee = await this.employeeService.createEmployee(email, name);
        res.status(200).send(employee);
    }
}

export default EmployeeController;