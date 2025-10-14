import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {

  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) { }

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto)
  };

  findAll() {
    return this.locationRepository.find()
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({
      locationId: id
    })
    if (!location) throw new NotFoundException("location not found")
    return location
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    await this.managerRepository
      .createQueryBuilder()
      .update()
      .set({ location : null })
      .where("locationId = :id", { id })
      .execute();
    
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto
    });
    if (!location) throw new NotFoundException()
    const savelocation = await this.locationRepository.save(location)

    const updatedManager = await this.managerRepository.preload({
      managerId: updateLocationDto.manager,
      location: location
    })
    if(updatedManager) await this.managerRepository.save(updatedManager)

    return savelocation
  }

  remove(id: number) {
    this.locationRepository.delete({
      locationId: id
    })
    return {
      message: `Location ${id} deleted`
    }
  }
}
