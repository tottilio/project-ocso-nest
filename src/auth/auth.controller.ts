import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  singup(@Body()createUserDto : CreateUserDTo){
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() createUserDto: CreateUserDTo){
    return this.authService.loginUser(createUserDto)
  }

}
