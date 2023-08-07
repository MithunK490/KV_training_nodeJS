import express, { NextFunction } from "express"
import DepartmentService from "../service/department.service"
import CreateDepartmentDto from "../dto/create-department-dto";
import { plainToInstance } from "class-transformer";
import createAddressDto from "../dto/create-address.dto";
import { validate } from "class-validator";
import authenticate from "../middleware/auithentication.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
class DepartmentController {
    public router: express.Router

    constructor(private departmentService: DepartmentService) {
        this.router = express.Router()

        this.router.get("/", authenticate, authorize([Role.HR, Role.DEVELOPER, Role.UI]), this.getAllDepartments);
        this.router.get("/:id", authenticate, authorize([Role.HR, Role.DEVELOPER, Role.UI]), this.getDepartmentById);
        this.router.post("/", authenticate, authorize([Role.HR]), this.createDepartment);
        this.router.put("/:id", authenticate, authorize([Role.HR]), this.updateDepartment);
        this.router.delete("/:id", authenticate, authorize([Role.HR]), this.deleteDepartment);
    }

    getAllDepartments = async (req: express.Request, res: express.Response) => {
        const department = await this.departmentService.getAllDepartments();
        res.status(200).send(department);
    }

    getDepartmentById = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const departmentId: number = Number(req.params.id);
            const department = await this.departmentService.getDepartmentById(departmentId)
            res.status(200).send(department)
        }
        catch (err) {
            next(err);
        }
    }

    createDepartment = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const departmentDto = plainToInstance(CreateDepartmentDto, req.body);

            const errors = await validate(departmentDto)
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
            }

            const department = await this.departmentService.createDepartment(departmentDto);
            res.status(200).send(department)
        }
        catch (err) {
            next(err)
        }
    }

    updateDepartment = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const departmentId: number = Number(req.params.id)
            const departmentDto = plainToInstance(CreateDepartmentDto, req.body);

            const errors = await validate(departmentDto)
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
            }

            const department = await this.departmentService.updateDepartment(departmentDto, departmentId);
            res.status(200).send(department)
        }
        catch (err) {
            next(err)
        }
    }

    deleteDepartment = async (req: express.Request, res: express.Response) => {
        const departmentId: number = Number(req.params.id)
        const department = await this.departmentService.deleteDepartment(departmentId);
        res.status(200).send(department);
    }
}

export default DepartmentController