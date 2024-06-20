import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ShopModule } from './module/shop/shop.module';
import { ApikeyModule } from './module/apikey/apikey.module';
import { AccessModule } from './module/access/access.module';
import { KeytokenModule } from './module/keytoken/keytoken.module';
import mongodbConfig from './config/mongodb.config';
import { ProductModule } from './module/product/product.module';
import { CartModule } from './module/cart/cart.module';
import { NotificationModule } from './module/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [mongodbConfig]
    }),
    DatabaseModule,
    ShopModule,
    ApikeyModule,
    AccessModule,
    KeytokenModule,
    ProductModule,
    CartModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
