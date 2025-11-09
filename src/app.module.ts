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
    //--> Base docker
    host: process.env.host, 
    // host: "192.168.3.22",
    port: 5432,
    username: 'postgres',
    // --> Base docker
    password: "LaMejorContraseña",
    // password: "cePzag-pygxez-2nyrpo",
    //--> Base docker
    database: process.env.name , 
    // database: "tienda" ,
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }), EmployeesModule, ProductModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
