import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
    constructor(private employeeReposiotory: EmployeeRepository) { }

    getAllEmployees = async (): Promise<Employee[]> =>{
        return this.employeeReposiotory.findAllEmployees();
    }

    getAnEmployeeById = async (id: number): Promise<Employee | null> => {
        return this.employeeReposiotory.findAnEmployeeById(id);
    }

    createEmployee = async (email: string, name: string): Promise<Employee> =>{
        const employee = new Employee();
        employee.name =  name;
        employee.email = email;
        return this.employeeReposiotory.createEmployee(employee);
    }

    // getAnEmployeeById = async (id: number): Promise<Employee | null> {
    //     return this.employeeReposiotory.findAnEmployeeById(id);
    // }

    // getAnEmployeeById = async (id: number): Promise<Employee | null> {
    //     return this.employeeReposiotory.findAnEmployeeById(id);
    // }

}

export default EmployeeService