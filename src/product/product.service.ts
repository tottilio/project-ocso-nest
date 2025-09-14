import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid} from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto)
    const saveProduct = this.productRepository.save(product)
    return saveProduct;
  }
  
  findAll() { 
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id
    })
    if (!product) throw new NotFoundException()
    return product;
  }

  findByProvider(id: string) {
    const productFound = this.productRepository.findOneBy({
      productId: id
    })
    if (!productFound) throw new NotFoundException()
    return productFound
  }

  async update(id:string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    })
    if (!productToUpdate) throw new NotFoundException()
    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  remove(id: string) {
    this.productRepository.delete({
      productId: id
    })

    return {
      message: `Objeto con id ${id} eliminado`
    }
  }
}
