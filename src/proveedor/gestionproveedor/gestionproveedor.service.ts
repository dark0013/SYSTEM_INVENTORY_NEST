import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { gestionproveedorDto } from './dto/gestionproveedorDto.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GestionproveedorService {

    constructor(private prisma: PrismaService) { }

    getAllProveedores() {
        try {
            return this.prisma.proveedor.findMany();
        } catch (error) {
            throw new HttpException({
                status: 'error',
                message: 'Error al obtener los proveedores',
                detail: error,
                timestamp: new Date().toISOString(),
                // path: req.url  // opcional si tienes acceso al objeto request
            }, HttpStatus.BAD_REQUEST);
        }

    }

    getProveedorById(id: number) {

        return this.prisma.proveedor.findMany();
    }

    saveProveedor(proveedor: gestionproveedorDto) {
        return this.prisma.proveedor.create({
            data: proveedor
        });
    }
    deleteProveedor(id: number) {
        return `ingresastes => ${id}`;
    }
    
}
