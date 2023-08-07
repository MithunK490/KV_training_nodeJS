import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt, { hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Role } from "../utils/role.enum";
import CreateEmployeeDto from "../dto/create-employee.dto";
import Department from "../entity/department-entity";
import DepartmentService from "./department.service";
import DepartmentRepository from "../repository/department.repository";
import dataSource from "../db/postgres.db";

class EmployeeService {
    constructor(
        private employeeReposiotory: EmployeeRepository,
        private departmentService: DepartmentService
    ) { }

    getAllEmployees = async (): Promise<Employee[]> => {
        return this.employeeReposiotory.findAllEmployees();
    }

    getAnEmployeeById = async (id: number): Promise<Employee | null> => {
        const employee = await this.employeeReposiotory.findAnEmployeeById(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with id ${id}`);
        }
        return employee;
    }

    // createEmployeeDto.email,
    // createEmployeeDto.name,
    // createEmployeeDto.address,
    // createEmployeeDto.password,
    // createEmployeeDto.role,



    createEmployee = async (
        employeeDto: CreateEmployeeDto
    ): Promise<Employee> => {
        const newAddress = new Address();
        newAddress.line1 = employeeDto.address.line1;
        newAddress.pincode = employeeDto.address.pincode;

        const newDepartment = await this.departmentService.getDepartmentById(employeeDto.department_id)

        const employee = new Employee();
        employee.name = employeeDto.name;
        employee.email = employeeDto.email;
        employee.age = employeeDto.age;
        employee.address = newAddress;
        employee.password = await bcrypt.hash(employeeDto.password, 10);
        employee.role = employeeDto.role;
        employee.department = newDepartment
        employee.department_id = employeeDto.department_id
        console.log(employee)
        // newAddress.employee = employee;

        return this.employeeReposiotory.createEmployee(employee);
    }

    deleteEmployee = async (id: number): Promise<Employee> => {
        const employee = await this.getAnEmployeeById(id);
        return  await this.employeeReposiotory.deleteEmployee(employee);
    }

    updateEmployee = async (
        id: number,
        employeeDto: CreateEmployeeDto,
    ): Promise<Employee> => {
        const employee = await this.getAnEmployeeById(id)
        employee.name = employeeDto.name;
        employee.email = employeeDto.email;
        employee.address.line1 = employeeDto.address.line1;
        employee.address.pincode = employeeDto.address.pincode;
        employee.password = await bcrypt.hash(employeeDto.password, 10);
        employee.role = employeeDto.role;
        employee.department_id = employeeDto.department_id;
        // newAddress.employee = employee;

        return this.employeeReposiotory.updateEmployee(employee);
    }

    loginEmployee = async (
        email: string,
        password: string
    ) => {
        const employee = await this.employeeReposiotory.findAnEmployeeByEmail(email);
        if (!employee) {
            throw new HttpException(401, "Incorrect username or password");
        }

        const result = await bcrypt.compare(password, employee.password);
        if (!result) {
            throw new HttpException(401, "Incorrect username or password");
        }

        const payload = {
            email: employee.name,
            password: employee.password,
            role: employee.role
        }

        const token = jsonwebtoken.sign(payload, "ABCDE", {
            expiresIn: "1h"
        });

        return { token: token };
    }
}

export default EmployeeService