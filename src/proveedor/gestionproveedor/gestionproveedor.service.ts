import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { gestionproveedorDto } from './dto/gestionproveedorDto.dto';
import { PrismaService } from 'src/prisma.service';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';


@Injectable()
export class GestionproveedorService {

    constructor(private prisma: PrismaService) { }

    async getAllProveedores() {

        const proveedores = await this.prisma.proveedor.findMany();
        return plainToInstance(gestionproveedorDto, proveedores, { excludeExtraneousValues: true });
    }

    async getProveedorById(id: number) {
        const proveedor = await this.prisma.proveedor.findUnique({
            where: { id: id }
        });
        return plainToInstance(gestionproveedorDto, proveedor, { excludeExtraneousValues: true });
    }

    /*  async saveProveedor(proveedor: gestionproveedorDto) {
         const create = await this.prisma.proveedor.create({
             data: proveedor
         })
         return plainToInstance(gestionproveedorDto, create, { excludeExtraneousValues: true });
     } */


    async saveProveedor(proveedor: gestionproveedorDto) {
        try {
            // Validar y limpiar entrada
            const dtoInstance = plainToInstance(gestionproveedorDto, proveedor);
            const data = instanceToPlain(dtoInstance) as Prisma.proveedorCreateInput;

            // Guardar
            const created = await this.prisma.proveedor.create({ data });

            // Limpiar salida
            return plainToInstance(gestionproveedorDto, created, { excludeExtraneousValues: true });

        } catch (error) {
            throw new HttpException({
                status: 'error',
                message: 'Error al guardar proveedor',
                detalleTecnico: error.message || error,
                timestamp: new Date().toISOString(),
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async updateProveedor(proveedor: gestionproveedorDto) {
        if (!proveedor.id) {
            throw new HttpException('ID no proporcionado', HttpStatus.BAD_REQUEST);
        }

        const id = Number(proveedor.id);
        if (isNaN(id)) {
            throw new HttpException('ID debe ser un número válido', HttpStatus.BAD_REQUEST);
        }

        try {
            // Convertir DTO a instancia y limpiar campos extraños
            const dtoInstance = plainToInstance(gestionproveedorDto, proveedor);
            const plain = instanceToPlain(dtoInstance) as Record<string, any>;

            // Quitar el campo ID del `data`, ya que Prisma no permite actualizarlo
            delete plain.id;

            // Asegurar tipo de Prisma
            const data = plain as Prisma.proveedorUpdateInput;

            const updated = await this.prisma.proveedor.update({
                where: { id },
                data,
            });

            // Limpiar resultado
            return plainToInstance(gestionproveedorDto, updated, { excludeExtraneousValues: true });

        } catch (error) {
            throw new HttpException({
                status: 'error',
                message: 'Error al actualizar proveedor',
                detalleTecnico: error.message || error,
                timestamp: new Date().toISOString(),
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteProveedor(id: number) {

        if (!id) {
            throw new HttpException('ID no proporcionado', HttpStatus.NOT_FOUND);
        }
        return this.prisma.proveedor.update({
            where: { id: id },
            data: { estado: 'N' }
        });
    }



}
