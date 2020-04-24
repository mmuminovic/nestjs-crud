import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
});

export interface Product extends mongoose.Document {
  id: string;
  title: string;
  desc: string;
  price: number;
}
