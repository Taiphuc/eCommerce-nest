import mongodbConfig from "src/config/mongodb.config";
import { DATABASE_CONNECTION } from "./database.constants";
import { ConfigType } from '@nestjs/config'
import { Connection, createConnection } from "mongoose";

export const databaseConnectionProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: (dbConfig: ConfigType<typeof mongodbConfig>): Connection => {
            const conn = createConnection(dbConfig.uri, {
                //useNewUrlParser: true,
                //useUnifiedTopology: true,
                //see: https://mongoosejs.com/docs/deprecations.html#findandmodify
                //useFindAndModify: false,
            })

            conn.on('connected', () => {
                console.log('Database connection established successfully.');
            });

            conn.on('error', (err) => {
                console.error('Database connection error:', err);
            });

            conn.on('disconnected', () => {
                console.log('Database connection disconnected.');

            });

            return conn
        },
        inject: [mongodbConfig.KEY]
    }
]