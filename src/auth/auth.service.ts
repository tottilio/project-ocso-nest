import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-users.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository <User>,
        private jwtService: JwtService
    ){}


    registerUser(createUserDto: CreateUserDTo){
        createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
        return this.userRepository.save(createUserDto)
    }

    async loginUser( loginUserDto: LoginUserDto ){
        const user = await this.userRepository.findOne({
            where:{
                userEmail: loginUserDto.userEmail
            }
        })
        if(!user) throw new NotFoundException()
        // - -> Hasheo and Jtoken
        const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword)
        if(!match) throw new UnauthorizedException("No esta autorizado");
        const preload = {
            userEmail : user.userEmail,
            userPassword : user.userPassword,
            userRoles: user.userRoles
        }
        const token = this.jwtService.sign(preload)
        return token
    }

    async updateUser(userEmail:string ,updateUserDto: UpdateUserDto){
        const newUserData = await this.userRepository.preload({
            userEmail,
            ...updateUserDto
        })
        if(!newUserData) throw new NotFoundException();
        this.userRepository.save(newUserData)
        return newUserData
    }
}
