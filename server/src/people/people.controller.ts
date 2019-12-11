import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Person } from './person.entity';

@Controller('people')
export class PeopleController {
    constructor(private peopleService: PeopleService) {
    }
    @Get()
    index():Promise<Person[]> {
        return this.peopleService.findAll();
    }

    @Get(':id/')
    async findOne(@Param('id') id, @Body() personData: Person): Promise<any> {
        personData.id = Number(id);
        console.log(`Updated ${personData.id}`);
        return this.peopleService.findOne(personData);
    }

    @Get('firstName')
    async findByFirstName(@Query('firstName')firstName, @Body() personData: Person): Promise<any> {
        personData.firstName = firstName;
        return this.peopleService.findByFirstName(personData);
    }

    @Post('create')
    async create(@Body() personData: Person): Promise<any> {
        return this.peopleService.create(personData);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() personData: Person): Promise<any> {
        personData.id = Number(id);
        console.log(`Update # ${personData.id}`);
        return this.peopleService.update(personData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.peopleService.delete(id);
    }

}
