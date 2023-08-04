import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
    constructor(private employeeReposiotory: EmployeeRepository) { }

    getAllEmployees = async (): Promise<Employee[]> =>{
        return this.employeeReposiotory.findAllEmployees();
    }

    getAnEmployeeById = async (id: number): Promise<Employee | null> => {
        const employee= await this.employeeReposiotory.findAnEmployeeById(id);
        if(!employee){
            throw new HttpException(404,`Employee not found with id ${id}`);
        }
        return employee;
    }

    createEmployee = async (email: string, name: string, address: Address): Promise<Employee> =>{
        const employee = new Employee();
        employee.name =  name;
        employee.email = email;

        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        employee.address = newAddress;
        // newAddress.employee = employee;

        return this.employeeReposiotory.createEmployee(employee);
    }

    deleteEmployee = async (id:number): Promise<void> =>{
        const employee = await this.getAnEmployeeById(id);
        await this.employeeReposiotory.deleteEmployee(employee);
    }

    // getAnEmployeeById = async (id: number): Promise<Employee | null> {
    //     return this.employeeReposiotory.findAnEmployeeById(id);
    // }

    // getAnEmployeeById = async (id: number): Promise<Employee | null> {
    //     return this.employeeReposiotory.findAnEmployeeById(id);
    // }

}

export default EmployeeService