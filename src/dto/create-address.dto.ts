import { IsNotEmpty, IsString } from "class-validator"

class createAddressDto{
    @IsString()
    @IsNotEmpty()
    line1: string;

    @IsString()
    @IsNotEmpty()
    pincode: string;
}

export default createAddressDto;