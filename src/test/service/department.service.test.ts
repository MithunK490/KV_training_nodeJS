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
    let departmentService: DepartmentService;
    let departmentRepository: DepartmentRepository;

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        departmentRepository = new DepartmentRepository(
            dataSource.getRepository(Department)
        );
        departmentService = new DepartmentService(departmentRepository)
            
    })

    describe("Test for getDepartmentById", () => {
        // test("Test getDepartmentById fails", async () => {
        //     const mockFunction = jest.fn();
        //     when(mockFunction).calledWith({ id: 1 }).mockResolvedValueOnce(null);
        //     employeeRepository.findAnEmployeeById = mockFunction;
        //     expect(async () => await employeeService.getAnEmployeeById(1)).rejects.toThrow(HttpException);
        // });

        test("Test getDepartmentById succeeds", async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce({ "id": 123, "name": "department1" });
            departmentRepository.findDepartmentById = mockFunction;
            expect(await departmentService.getDepartmentById(1)).toStrictEqual({ "id": 123, "name": "department1" });
        })

    });


    describe("Test for getAllDepartments", () => {
        test("Test getAllDepartments succeeds", async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith().mockResolvedValueOnce(
                [
                    { "id": 123, "name": "department1" },
                    { "id": 234, "name": "department2" }
                ]);
            departmentRepository.findAlldepartments = mockFunction;
            expect(await departmentService.getAllDepartments()).toStrictEqual(
                [
                    { "id": 123, "name": "department1" },
                    { "id": 234, "name": "department2" }
                ]);
        })

    });


    describe("Test for createDepartment", () => {


        const departmentDto = new CreateDepartmentDto();
        departmentDto.name = "Sales";
        departmentDto.location = "Smart city"

        const department = {
            name: "Sales",
            location: "Smart city"
        }

        test("Test createDepartment succeeds", async () => {
            const mockFunction = jest.fn();
            // console.log('***', employee);
            when(mockFunction).calledWith(department).mockResolvedValue(
                {
                    "name": "Sales",
                    "location": "Smart city"
                }
            );
            departmentRepository.createDepartment = mockFunction;
            expect(await departmentService.createDepartment(departmentDto)).toStrictEqual(
                {
                    "name": "Sales",
                    "location": "Smart city"
                }
            );
        })

    });

    describe("Test for updateEmployee", () => {

        const departmentDto = new CreateDepartmentDto();
        departmentDto.name = "Sales";
        departmentDto.location = "Smart city"

        const department = {
            name: "Sales",
            location: "Smart city"
        }
        test("Test updateEmployee succeeds", async () => {

            const mockFunction = jest.fn();
            (mockFunction).mockResolvedValue(
                {
                    "name": "Sales",
                    "location": "Smart city"
                }
            )
            departmentRepository.findDepartmentById = mockFunction
            expect(await departmentService.getDepartmentById(15)).toStrictEqual(
                {
                    "name": "Sales",
                    "location": "Smart city"
                }
            )

            const mockFunctionEmployeeRepositoryUpdateEmployee = jest.fn();
            // console.log('***', employee);
            when(mockFunctionEmployeeRepositoryUpdateEmployee).mockResolvedValue(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
            departmentRepository.updateDepartment = mockFunctionEmployeeRepositoryUpdateEmployee;
            expect(await departmentService.updateDepartment(departmentDto, 15)).toStrictEqual(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
        })

    });

    describe("Test for deleteEmployee", () => {

        const departmentDto = new CreateDepartmentDto();
        departmentDto.name = "Sales";
        departmentDto.location = "Smart city"

        const department = {
            name: "Sales",
            location: "Smart city"
        }
        test("Test updateEmployee succeeds", async () => {

            const mockFunction = jest.fn();
            (mockFunction).mockResolvedValue(
                {
                    "name": "Sales",
                    "location": "Smart city"
                }
            )
            departmentRepository.findDepartmentById = mockFunction
            expect(await departmentService.getDepartmentById(15)).toStrictEqual(
                {
                    "name": "Sales",
                    "location": "Smart city"
                }
            )

            const mockFunctionEmployeeRepositoryUpdateEmployee = jest.fn();
            // console.log('***', employee);
            when(mockFunctionEmployeeRepositoryUpdateEmployee).mockResolvedValue(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
            departmentRepository.deleteDepartment = mockFunctionEmployeeRepositoryUpdateEmployee;
            expect(await departmentService.deleteDepartment(15)).toStrictEqual(
                {
                    "id": 123,
                    "name": "employee1",

                }
            );
        })

    });

})

