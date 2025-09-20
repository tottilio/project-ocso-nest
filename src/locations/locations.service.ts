import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {

  constructor(
    private locationRepository: Repository<Location>
  ){}

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
    return location
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const locationUpdated = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto
    })
    if(!locationUpdated) throw new NotFoundException()
    return locationUpdated
  }

  remove(id: number) {
    return this.locationRepository.delete({
      locationId: id
    })
  }
}
