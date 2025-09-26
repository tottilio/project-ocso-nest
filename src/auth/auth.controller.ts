import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  singup(@Body()createUserDto : CreateUserDTo){
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto : LoginUserDto){
    return this.authService.loginUser(loginUserDto)
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail, @Body() updateuserDto :UpdateUserDto ){
    return this.authService.updateUser(userEmail, updateuserDto)
  }

}
