import EmployeeController from "../controller/employee.controller";
import dataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";


const employeeReposiotory = new EmployeeRepository(dataSource.getRepository(Employee))
const employeeService = new EmployeeService(employeeReposiotory);
const employeeController = new EmployeeController(employeeService);
const employeeRoute = employeeController.router;

export default employeeRoute;