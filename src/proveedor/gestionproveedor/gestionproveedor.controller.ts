import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GestionproveedorService } from './gestionproveedor.service';
import { gestionproveedorDto } from './dto/gestionproveedorDto.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('gestionproveedor')
@ApiTags("tasks")
export class GestionproveedorController {
    constructor(private proveedorServices: GestionproveedorService) { }
    @Get()
    @ApiOperation({ summary: 'retorna un listado con la información de todos los proveedores' })
    @ApiResponse({ status: 200, description: 'retorna un listado con la información de todos los proveedores' })
    @ApiResponse({ status: 404, description: 'No se encontraron proveedores' })
    getAllProveedores() {
        return this.proveedorServices.getAllProveedores();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'retorna el listado de la información del proveedor encontrado por el Id' })
    getProveedorById(@Param('id') id: number) {
        return this.proveedorServices.getProveedorById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crea un nuevo proveedor' })
    saveProveedor(@Body() proveedor: gestionproveedorDto) {
        return this.proveedorServices.saveProveedor(proveedor);
    }
    @Put()
    @ApiOperation({ summary: 'Actualiza un proveedor' })
    updateProveedor(@Body() proveedor: gestionproveedorDto) {
        return this.proveedorServices.saveProveedor(proveedor);
    }
    @Delete('/:id')
    @ApiOperation({ summary: 'Inactiva un proveedor por su id' })
    deleteProveedor(@Param('id') id: number) {
        return this.proveedorServices.deleteProveedor(id);
    }
}
