import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({ title, desc, price });
    const result = await newProduct.save();
    return result._id as string;
  }

  async getProducts() {
    const products = await this.productModel.find();
    return [...products] as Product[];
  }

  async getSignleProduct(productId: string) {
    const product = await this.productModel.findById(productId);
    if(!product){
        throw new NotFoundException("Not found");
    }
    return product;
  }

  async updateProduct(
    prodId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const product = await this.productModel.findById(prodId).exec();
    if(!product){
        throw new NotFoundException("Not found");
    }
    product.title = title ? title : product.title;
    product.desc = desc ? desc : product.desc;
    product.price = price ? price : product.price;
    const result = await product.save();
    return result;
  }

  async deleteOneProduct(prodId: string) {
    await this.productModel.deleteOne({ _id: prodId });
    return null;
  }
}
