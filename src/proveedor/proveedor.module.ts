import { Module } from '@nestjs/common';
import { GestionproveedorModule } from './gestionproveedor/gestionproveedor.module';

@Module({
  imports: [GestionproveedorModule]
})
export class ProveedorModule {}
