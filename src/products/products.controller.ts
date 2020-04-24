import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.getProducts();
    return products.map(prod => ({id: prod.id, title: prod.title, desc: prod.desc, price: prod.price}));
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return await this.productService.getSignleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const result = await this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return result;
  }

  @Delete(':id')
  removeProduct(
    @Param('id') prodId: string
  ){
    this.productService.deleteOneProduct(prodId);
    return null;
  }
}
