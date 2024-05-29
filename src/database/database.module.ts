import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import mongodbConfig from "src/config/mongodb.config";
import { databaseConnectionProviders } from "./database-connection.provider";
import { databaseModelsProviders } from "./database-models.provider";

@Module({
    imports: [ConfigModule.forFeature(mongodbConfig)],
    providers: [...databaseConnectionProviders, ...databaseModelsProviders],
    exports: [...databaseConnectionProviders, ...databaseModelsProviders]
})
export class DatabaseModule { }