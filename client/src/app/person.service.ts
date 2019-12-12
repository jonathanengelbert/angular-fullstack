import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Person } from './person';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // private peopleUrl = 'api/people';
  private peopleUrl = 'http://localhost:3000/people/';
  httpOptions = {
   headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private  messageService: MessageService,
  ) {}

  private log(message: string) {
    this.messageService.add( `PersonService: ${message}`);
  }

  searchPeople(term: string): Observable<Person[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Person[]>(`${this.peopleUrl}?firstName=${term}`)
      .pipe(
        tap(_ => this.log(`found people matching "${term}"`)),
        catchError(this.handleError<Person[]>('searchPeople', []))
      )
  }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl)
      .pipe(
        tap(_ => this.log('fetched people')),
        catchError(this.handleError<Person[]>('getPeople', []))
      );
  }

  getPerson(id: number): Observable<Person> {
    const url = `${this.peopleUrl}${id}`;
    return this.http.get<Person>(url).pipe(
      tap(_=> this.log(`fetched person id = ${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }

  updatePerson(person: Person): Observable<any> {
     return this.http.put(`${this.peopleUrl}${person.id}/update`, person, this.httpOptions)
       .pipe(
       tap(_ => this.log(`updated person id=${person.id}`)),
       catchError(this.handleError<any>('updatedPerson'))
     );
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post(`${this.peopleUrl}create/`, person, this.httpOptions)
      .pipe(
        tap((newPerson: Person) => this.log(`added person w/ id=${newPerson.id}`)),
        catchError(this.handleError<Person>('addPerson'))
      );
  }

  deletePerson(person: Person): Observable<Person> {
    const id = typeof person === 'number' ? person : person.id
    const url = `${this.peopleUrl}${id}/delete`;

    return this.http.delete<Person>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted person id = ${id}`)),
        catchError(this.handleError<Person>('deletePerson'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`)
      return of(result as T);
    }
  }
}
