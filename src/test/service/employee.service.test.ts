import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import { when } from "jest-when";
import HttpException from "../../exception/http.exception";
import CreateEmployeeDto from "../../dto/create-employee.dto";
import createAddressDto from "../../dto/create-address.dto";
import { Role } from "../../utils/role.enum";
import Address from "../../entity/address.entity";
import CreateDepartmentDto from "../../dto/create-department-dto";
import DepartmentService from "../../service/department.service";
import DepartmentRepository from "../../repository/department.repository";
import Department from "../../entity/department-entity";
import bcrypt, { hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

describe("Employee service test", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    let departmentService: DepartmentService

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(
            dataSource.getRepository(Employee)
        );
        departmentService = new DepartmentService(
            new DepartmentRepository(
                dataSource.getRepository(Department)
            )
        )
        employeeService = new EmployeeService(employeeRepository, departmentService)

    })

    describe("Test for getEmployeeById", () => {
        test("Test getAnEmployeeById fails", async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith({ id: 1 }).mockResolvedValueOnce(null);
            employeeRepository.findAnEmployeeById = mockFunction;
            expect(async () => await employeeService.getAnEmployeeById(1)).rejects.toThrow(HttpException);
        });

        test("Test getAnEmployeeById succeeds", async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce({ "id": 123, "name": "employee1" });
            employeeRepository.findAnEmployeeById = mockFunction;
            expect(await employeeService.getAnEmployeeById(1)).toStrictEqual({ "id": 123, "name": "employee1" });
        })

    });


    describe("Test for getAllEmployees", () => {
        test("Test getAllEmployees succeeds", async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith().mockResolvedValueOnce(
                [
                    { "id": 123, "name": "employee1" },
                    { "id": 234, "name": "employee2" }
                ]);
            employeeRepository.findAllEmployees = mockFunction;
            expect(await employeeService.getAllEmployees()).toStrictEqual(
                [
                    { "id": 123, "name": "employee1" },
                    { "id": 234, "name": "employee2" }
                ]);
        })

    });


    describe("Test for createEmployee", () => {

        const addressDto = new createAddressDto();
        addressDto.line1 = "Info Park, Kakkanad";
        addressDto.pincode = "6759876";

        const departmentDto = new CreateDepartmentDto();
        departmentDto.name = "Sales";
        departmentDto.location = "Smart city"

        const employeeDto = new CreateEmployeeDto();
        employeeDto.name = "employee1";
        employeeDto.email = "employee1@gmail.com";
        employeeDto.age = 25;
        employeeDto.address = addressDto;
        employeeDto.password = "employee123";
        employeeDto.role = Role.DEVELOPER;
        employeeDto.department_id = 5;
        employeeDto.department = departmentDto

        const address = {
            line1: "Info Park, Kakkanad",
            pincode: "6759876"
        }

        const department = {
            name: "Sales",
            location: "Smart city"
        }

        const employee = {
            name: "employee1",
            email: "employee1@gmail.com",
            age: 25,
            address: address,
            password: expect.anything(),
            role: Role.DEVELOPER,
            department_id: 5,
            department: department

        }

        test("Test createEmployee succeeds", async () => {
            const mockFunctionDepartmentServiceGetDepartmentById = jest.fn();
            mockFunctionDepartmentServiceGetDepartmentById.mockResolvedValue(
                {
                    "name": "Sales",
                    "location": "Smart city"
                }
            )
            departmentService.getDepartmentById = mockFunctionDepartmentServiceGetDepartmentById;
            expect(await departmentService.getDepartmentById(5)).toStrictEqual(
                {
                    "name": "Sales",
                    "location": "Smart city"
                }
            )


            const mockFunctionEmployeeRepositoryCreateEmployee = jest.fn();
            console.log('***', employee);
            when(mockFunctionEmployeeRepositoryCreateEmployee).calledWith(employee).mockResolvedValue(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
            employeeRepository.createEmployee = mockFunctionEmployeeRepositoryCreateEmployee;
            expect(await employeeService.createEmployee(employeeDto)).toStrictEqual(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
        })

    });

    describe("Test for updateEmployee", () => {

        const addressDto = new createAddressDto();
        addressDto.line1 = "Info Park, Kakkanad";
        addressDto.pincode = "6759876";

        const departmentDto = new CreateDepartmentDto();
        departmentDto.name = "Sales";
        departmentDto.location = "Smart city"

        const employeeDto = new CreateEmployeeDto();
        employeeDto.name = "employee1";
        employeeDto.email = "employee1@gmail.com";
        employeeDto.age = 25;
        employeeDto.address = addressDto;
        employeeDto.password = "employee123";
        employeeDto.role = Role.DEVELOPER;
        employeeDto.department_id = 5;
        employeeDto.department = departmentDto

        const address = {
            line1: "Info Park, Kakkanad",
            pincode: "6759876"
        }

        const department = {
            name: "Sales",
            location: "Smart city"
        }

        const employee = {
            name: "employee1",
            email: "employee1@gmail.com",
            age: 25,
            address: address,
            password: expect.anything(),
            role: Role.DEVELOPER,
            department_id: 5,
            department: department

        }

        test("Test updateEmployee succeeds", async () => {

            const mockFunctionEmployeeRepositoryFindEmployeeById = jest.fn();
            (mockFunctionEmployeeRepositoryFindEmployeeById).mockResolvedValue(
                {
                    "name": "employee1",
                    "email": "employee1@gmail.com",
                    "address": {
                        "line1": "abc",
                        "pincode": "123123"
                    }
                }
            )
            employeeRepository.findAnEmployeeById = mockFunctionEmployeeRepositoryFindEmployeeById
            expect(await employeeService.getAnEmployeeById(15)).toStrictEqual(
                {
                    "name": "employee1",
                    "email": "employee1@gmail.com",
                    "address": {
                        "line1": "abc",
                        "pincode": "123123"
                    }
                }
            )

            const mockFunctionEmployeeRepositoryUpdateEmployee = jest.fn();
            console.log('***', employee);
            when(mockFunctionEmployeeRepositoryUpdateEmployee).mockResolvedValue(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
            employeeRepository.updateEmployee = mockFunctionEmployeeRepositoryUpdateEmployee;
            expect(await employeeService.updateEmployee(15, employeeDto)).toStrictEqual(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
        })

    });


    describe("Test for deleteEmployee", () => {

        const addressDto = new createAddressDto();
        addressDto.line1 = "Info Park, Kakkanad";
        addressDto.pincode = "6759876";

        const departmentDto = new CreateDepartmentDto();
        departmentDto.name = "Sales";
        departmentDto.location = "Smart city"

        const employeeDto = new CreateEmployeeDto();
        employeeDto.name = "employee1";
        employeeDto.email = "employee1@gmail.com";
        employeeDto.age = 25;
        employeeDto.address = addressDto;
        employeeDto.password = "employee123";
        employeeDto.role = Role.DEVELOPER;
        employeeDto.department_id = 5;
        employeeDto.department = departmentDto

        const address = {
            line1: "Info Park, Kakkanad",
            pincode: "6759876"
        }

        const department = {
            name: "Sales",
            location: "Smart city"
        }

        const employee = {
            name: "employee1",
            email: "employee1@gmail.com",
            age: 25,
            address: address,
            password: expect.anything(),
            role: Role.DEVELOPER,
            department_id: 5,
            department: department

        }


        test("Test deleteEmployee succeeds", async () => {

            const mockFunctionEmployeeRepositoryFindEmployeeById = jest.fn();
            (mockFunctionEmployeeRepositoryFindEmployeeById).mockResolvedValue(
                {
                    "name": "employee1",
                    "email": "employee1@gmail.com",
                    "address": {
                        "line1": "abc",
                        "pincode": "123123"
                    }
                }
            )
            employeeRepository.findAnEmployeeById = mockFunctionEmployeeRepositoryFindEmployeeById
            expect(await employeeService.getAnEmployeeById(15)).toStrictEqual(
                {
                    "name": "employee1",
                    "email": "employee1@gmail.com",
                    "address": {
                        "line1": "abc",
                        "pincode": "123123"
                    }
                }
            )

            const mockFunctionEmployeeRepositoryDeleteEmployee = jest.fn();
            console.log('***', employee);
            when(mockFunctionEmployeeRepositoryDeleteEmployee).mockResolvedValue(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
            employeeRepository.deleteEmployee = mockFunctionEmployeeRepositoryDeleteEmployee;
            expect(await employeeService.deleteEmployee(4)).toStrictEqual(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
        })

    });

    describe("Test for login", () => {
        test(' Test for login for an Employee succeeds', async () => {
            const mockedFunction = jest.fn();
            jsonwebtoken.sign = jest.fn().mockReturnValue("eyJhbGciOiJ");
            bcrypt.compare = jest.fn().mockResolvedValue(true)
            when(mockedFunction).calledWith("ash").mockResolvedValueOnce({
                "id": 4,
                "name": "Ashok",
                "username": "ash",
                "password": "$2b$10$1Bse2yUt7IVuEjOJ2tBo0O46fQgL8gbuZPrurxM6xpN56cjt4LgAy",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            })
        })

    })
})
