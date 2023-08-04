import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt, { hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Role } from "../utils/role.enum";

class EmployeeService {
    constructor(private employeeReposiotory: EmployeeRepository) { }

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

    createEmployee = async (
        email: string,
        name: string,
        address: Address,
        password: string,
        role: Role
    ): Promise<Employee> => {
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        const employee = new Employee();
        employee.name = name;
        employee.email = email;
        employee.address = newAddress;
        employee.password = await bcrypt.hash(password, 10);
        employee.role = role;
        // newAddress.employee = employee;

        return this.employeeReposiotory.createEmployee(employee);
    }

    deleteEmployee = async (id: number): Promise<void> => {
        const employee = await this.getAnEmployeeById(id);
        await this.employeeReposiotory.deleteEmployee(employee);
    }

    updateEmployee = async (
        id: number,
        email: string,
        name: string,
        address: Address,
        password: string,
        role: Role
    ): Promise<Employee> => {
        const employee = await this.getAnEmployeeById(id)
        employee.name = name;
        employee.email = email;
        employee.address = address;
        employee.password = await bcrypt.hash(password, 10);
        employee.role = role;
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