import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiAuth()
@ApiTags("Product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      productId: "UUID",
      productName: "Producto1",
      productPrice: 18,
      productSeal: 3,
    } as Product
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id',new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productService.findOne(id);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get('provider/:id')
  findByProvider(@Param('id', new ParseUUIDPipe({version: '4'})) id:string){
    return this.productService.findByProvider(id)
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id',new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id',new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productService.remove(id);
  }
}
