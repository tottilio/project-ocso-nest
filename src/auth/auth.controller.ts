import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-users.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @ApiResponse({
    status: 201,
    example:{ 
      userEmail: "juan@correo.com",
      userId: "UUID",
      userPassword: "juanpass123",
      userRoles: ["Employee"]
    } as User
  })
  @Post('singup')
  singup(@Body()createUserDto : CreateUserDTo){
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto : LoginUserDto){
    return this.authService.loginUser(loginUserDto)
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail:string, @Body() updateuserDto :UpdateUserDto ){
    return this.authService.updateUser(userEmail, updateuserDto)
  }

}
