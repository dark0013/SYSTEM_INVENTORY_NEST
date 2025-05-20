import { Expose } from "class-transformer";
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
    @Expose()
    id?: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    @Expose()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @Expose()
    dni: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    @Expose()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @Expose()
    telefono: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @Expose()
    direccion: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @Expose()
    tipoProveedor: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @Expose()
    estado: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @Expose()
    contacto: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @Expose()
    usuario: string;

}