import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-users.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import type { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './decorators/cookies.decorator';

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
  async loginUser(@Body() loginUserDto : LoginUserDto, @Res({passthrough: true}) response:Response, @Cookies() cookies: any){
    const token = await this.authService.loginUser(loginUserDto);
    console.log('token', token)
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      
    })
    return;
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail:string, @Body() updateuserDto :UpdateUserDto ){
    return this.authService.updateUser(userEmail, updateuserDto)
  }

}
