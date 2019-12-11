import { Module } from '@nestjs/common';
import { TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import {Person} from "./people/person.entity";


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'jengel',
        password: 'Jpe 073 073 85!!',
        database: 'hr',
        entities: [Person],
        synchronize: true,
      }),
      PeopleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
