import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesModule } from './employees.module';

@Injectable()
export class EmployeesService {

  // - - Base de datos SIMULADA
  private employees: CreateEmployeeDto[] = [
    {
      id: 0,
      name: 'John ',
      lastName: 'Gutierrez',
      phoneNumber: '672562125'
    },
    {
      id: 1,
      name: 'Jane Smith',
      lastName: 'Allen',
      phoneNumber: '987654321',
    }
  ]
  // - - Acaba base de datos SIMULADA

  // Metodos a utilizar en employees
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length;
    this.employees.push(createEmployeeDto)
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee) => employee.id === id)
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);

    employeeToUpdate = {
      ...employeeToUpdate,
      ...updateEmployeeDto
    }

    this.employees = this.employees.map((employee) => {
      if(employee.id === id){
        employee = employee;
      }
       return employee
    })
    return employeeToUpdate
  }

  remove(id: number) {
      this.employees =  this.employees.filter((employee) => employee.id !== id)
     
      return this.employees
  }
}
