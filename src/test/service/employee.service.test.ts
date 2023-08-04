import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import { when } from "jest-when";
import HttpException from "../../exception/http.exception";

describe("Employee service test", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(
            dataSource.getRepository(Employee)
        );
        employeeService = new EmployeeService(employeeRepository)

    })

    describe("Test for getEmployeeById", () => {
        test("Test getAnEmployeeById fails",async ()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith({id:1}).mockResolvedValueOnce(null);
            employeeRepository.findAnEmployeeById = mockFunction;
            expect(async() => await employeeService.getAnEmployeeById(1)).rejects.toThrow(HttpException);
        });

        test("Test getAnEmployeeById succeeds", async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce({"id":123, "name": "employee1"});
            employeeRepository.findAnEmployeeById = mockFunction;
            expect(await employeeService.getAnEmployeeById(1)).toStrictEqual({"id":123, "name": "employee1"});
        })

    });

})

