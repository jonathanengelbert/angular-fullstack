import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { Person } from "./person.entity";


@Module({
  imports: [
      TypeOrmModule.forFeature([Person]),
  ],
  providers: [PeopleService],
  controllers: [PeopleController]
})
export class PeopleModule {}
