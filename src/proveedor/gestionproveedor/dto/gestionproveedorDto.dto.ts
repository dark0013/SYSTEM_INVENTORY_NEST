import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";

export class gestionproveedorDto {
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    dni: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    telefono: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    direccion: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    tipoProveedor: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    estado: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    contacto: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    usuario: string;

}