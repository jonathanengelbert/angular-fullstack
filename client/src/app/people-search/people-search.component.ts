import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {Person} from '../person';
import {PersonService} from '../person.service';

@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: ['./people-search.component.scss']
})
export class PeopleSearchComponent implements OnInit {

  people$: Observable<Person[]>;
  private searchTerms = new Subject<string>();

  constructor(private personService: PersonService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.people$ = this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.personService.searchPeople(term)),
      );
  }
}
