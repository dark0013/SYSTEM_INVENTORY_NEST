import { Module } from '@nestjs/common';
import { ProveedorModule } from './proveedor/proveedor.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [ProveedorModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
