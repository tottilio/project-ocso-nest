import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid} from 'uuid'
 
@Injectable()
export class ProductService {
// - - Entidad productoos - -
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas standart",
      productPrice: 19,
      productSeal: 3,
      productProvider: uuid(),
    },
    {
      productId: uuid(),
      productName: "chips",
      productPrice: 17,
      productSeal:2,
      productProvider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Coca cola",
      productPrice: 20,
      productSeal: 5,
      productProvider: uuid(),
    }
  ]

  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid()
    this.products.push(createProductDto);
    return createProductDto;
  }
  
  findAll() { 
    return this.products
  }

  findOne(id: string) {
    const product = this.products.filter((product) => product.productId == id)[0]
    if (!product) throw new NotFoundException();
    return product;
  }

  findByProvider(id: string) {
    const productFound = this.products.filter((product) => product.productProvider === id)
    if (!productFound) throw new NotFoundException()
    return productFound
  }

  update(id:string, updateProductDto: UpdateProductDto) {
    let productToUpdate = this.findOne(id)

    this.products = this.products.map((product) => {
      if(product.productId === id){
        product = productToUpdate
      }
      return product
    })

    return {
      productToUpdate,
      updateProductDto,
    }
  }

  remove(id: string) {
    const { productId } = this.findOne(id)
    this.products = this.products.filter((product) => product.productId !== productId)
    return this.products
  }
}
