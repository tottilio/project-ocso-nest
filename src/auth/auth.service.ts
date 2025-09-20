import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository <User>
    ){}

    registerUser(createUserDto: CreateUserDTo){
        createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
        return this.userRepository.save(createUserDto)
    }

    async loginUser( createUserDto: CreateUserDTo ){
        const user = await this.userRepository.findOne({
            where:{
                userEmail: createUserDto.userEmail
            }
        })
        if(!user) throw new NotFoundException()
        // - -> Hasheo and Jtoken
        const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword)
        if(!match) throw new UnauthorizedException("No esta autorizado");
        const token = jwt.sign(JSON.stringify(user), "SECRET KEY")
        return token
    }
}
