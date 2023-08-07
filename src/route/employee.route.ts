import EmployeeController from "../controller/employee.controller";
import dataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import DepartmentService from "../service/department.service";
import DepartmentRepository from "../repository/department.repository";
import Department from "../entity/department-entity";


const departmentRepository = new DepartmentRepository(dataSource.getRepository(Department))
const departmentService = new DepartmentService(departmentRepository)

const employeeReposiotory = new EmployeeRepository(dataSource.getRepository(Employee))
const employeeService = new EmployeeService(employeeReposiotory,departmentService);
const employeeController = new EmployeeController(employeeService);
const employeeRoute = employeeController.router;

export default employeeRoute;