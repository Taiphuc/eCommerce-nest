import { Connection } from 'mongoose';
import {
    APIKEY_MODEL,
    CART_MODEL,
    DATABASE_CONNECTION, KEY_MODEL, PRODUCT_MODEL, SHOP_MODEL,
} from './database.constants';
import { createShopModel } from './models/shop.model';
import { createKeyModel } from './models/keytoken.model';
import { createApikeyModel } from './models/apikey.model';
import { createProductModel } from './models/product.model';
import { createCartModel } from './models/cart.model';

export const databaseModelsProviders = [
    {
        provide: SHOP_MODEL,
        useFactory: (connection: Connection) => createShopModel(connection),
        inject: [DATABASE_CONNECTION]
    },
    {
        provide: APIKEY_MODEL,
        useFactory: (connection: Connection) => createApikeyModel(connection),
        inject: [DATABASE_CONNECTION]
    },
    {
        provide: KEY_MODEL,
        useFactory: (connection: Connection) => createKeyModel(connection),
        inject: [DATABASE_CONNECTION]
    },
    {
        provide: PRODUCT_MODEL,
        useFactory: (connection: Connection) => createProductModel(connection),
        inject: [DATABASE_CONNECTION]
    },
    {
        provide: CART_MODEL,
        useFactory: (connection: Connection) => createCartModel(connection),
        inject: [DATABASE_CONNECTION]
    }
]