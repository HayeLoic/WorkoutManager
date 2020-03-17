import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Workout } from '../models/workout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutsUrl = 'api/workouts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getWorkouts(): Observable<Workout[]> {
    this.messageService.add('WorkoutService: fetched Workouts');
    return this.http.get<Workout[]>(this.workoutsUrl).pipe(
      tap(_ => this.log('fetched workouts')),
      catchError(this.handleError<Workout[]>('getWorkouts', []))
    );
  }

  getWorkout(id: number): Observable<Workout> {
    const url = `${this.workoutsUrl}/${id}`;
    return this.http.get<Workout>(url).pipe(
      tap(_ => this.log(`fetched workout id=${id}`)),
      catchError(this.handleError<Workout>(`getWorkout id=${id}`))
    );
  }

  updateWorkout (workout: Workout): Observable<any> {
    return this.http.put(this.workoutsUrl, workout, this.httpOptions).pipe(
      tap(_ => this.log(`updated workout id=${workout.id}`)),
      catchError(this.handleError<any>('updateWorkout'))
    );
  }

  addWorkout (workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(this.workoutsUrl, workout, this.httpOptions).pipe(
      tap((newWorkout: Workout) => this.log(`added workout w/ id=${newWorkout.id}`)),
      catchError(this.handleError<Workout>('addWorkout'))
    );
  }

  deleteWorkout (workout: Workout | number): Observable<Workout> {
    const id = typeof workout === 'number' ? workout : workout.id;
    const url = `${this.workoutsUrl}/${id}`;
  
    return this.http.delete<Workout>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted workout id=${id}`)),
      catchError(this.handleError<Workout>('deleteWorkout'))
    );
  }

  private log(message: string) {
    this.messageService.add(`WorkoutService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
