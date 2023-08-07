import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested, isNotEmpty } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import createAddressDto from "./create-address.dto";
import { Role } from "../utils/role.enum";
import Department from "../entity/department-entity";
import CreateDepartmentDto from "./create-department-dto";

class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    age: number

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(
        ()=>createAddressDto
    )
    address: createAddressDto;

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(
        ()=>CreateDepartmentDto
    )
    department: CreateDepartmentDto

    @IsNotEmpty()
    @IsNumber()
    department_id: number
}

export default CreateEmployeeDto;