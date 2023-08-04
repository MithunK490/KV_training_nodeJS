import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateNested, isNotEmpty } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import createAddressDto from "./create-address.dto";
import { Role } from "../utils/role.enum";

class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(
        ()=>createAddressDto
    )
    address: Address;

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}

export default CreateEmployeeDto;