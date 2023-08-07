import { IsNotEmpty, IsString } from "class-validator";
import createAddressDto from "./create-address.dto";

class CreateDepartmentDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location: string
}

export default CreateDepartmentDto;