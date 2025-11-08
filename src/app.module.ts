import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ProductModule } from './product/product.module';
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    // host: process.env.host, --> Base docker
    host: "192.168.3.22",
    port: 5432,
    username: 'postgres',
    //password: "LaMejorContraseña", --> Base docker
    password: "cePzag-pygxez-2nyrpo",
    //database: process.env.name , --> Base docker
    database: "tienda" ,
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }), EmployeesModule, ProductModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
