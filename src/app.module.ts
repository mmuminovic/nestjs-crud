import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs', { useUnifiedTopology: true, useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
