import {Component, OnInit} from '@angular/core';
// import {PEOPLE} from '../local-people';
import {Person} from "../person";
import { PersonService } from '../person.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: Person[];

  constructor(private personService: PersonService) {
  }

  ngOnInit() {
    this.getPeople();
  }


  getPeople(): void {
    this.personService.getPeople()
      .subscribe(people => this.people = people);
  }

  add(firstName: string, lastName: string): void {
    // name = name.trim();
    if(!firstName || !lastName) { return; }

    this.personService.addPerson({ firstName, lastName } as Person)
      .subscribe(person => {
        console.log(this.people)
        this.people.push(person);
      });
  }

  delete(person: Person): void {
    this.people = this.people.filter(p => p !== person);
    this.personService.deletePerson(person).subscribe();
  }
}

