import { InMemoryDbService } from "angular-in-memory-web-api";
import { Person } from './person';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
    const people = [
      {id: 1, name: 'James'},
      {id: 2, name: 'Mary'},
      {id: 3, name: 'Thomas'},
      {id: 4, name: 'Paul'},
      {id: 5, name: 'Louie'},
    ];
    return {people};
  }

  genId(people: Person[]): number {
    return people.length > 0 ? Math.max(...people.map(person => person.id)) + 1 : 1;
  }
}
