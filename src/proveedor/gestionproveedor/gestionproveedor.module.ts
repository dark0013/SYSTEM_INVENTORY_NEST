import { Module } from '@nestjs/common';
import { GestionproveedorService } from './gestionproveedor.service';
import { GestionproveedorController } from './gestionproveedor.controller';

@Module({
  controllers: [GestionproveedorController],
  providers: [GestionproveedorService]
})
export class GestionproveedorModule { }
