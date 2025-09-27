import { PartialType } from '@nestjs/swagger';
import { CreateUserDTo } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDTo) {}
