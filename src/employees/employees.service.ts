import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  // Metodos a utilizar en employees
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      id: id
    })
    // - - Lanzar error 4004 con NotFoundException(); - - 
    if (!employee) throw new NotFoundException();
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      id : id,
      ...updateEmployeeDto
    })
    this.employeeRepository.save(updateEmployeeDto)
    return employeeToUpdate
  }

  remove(id: string) {
    this.employeeRepository.delete({
      id :id,
    })
    return {
      message: "Employee Eliminado"
    }
  }
}
