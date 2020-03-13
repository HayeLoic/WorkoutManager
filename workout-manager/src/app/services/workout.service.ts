import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Workout } from '../models/workout';
import { WORKOUTS } from '../mocks/mock-workouts';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private messageService: MessageService) { }

  getWorkouts(): Observable<Workout[]> {
    // TODO: send the message _after_ fetching the Workouts
    this.messageService.add('WorkoutService: fetched Workouts');
    return of(WORKOUTS);
  }

  getWorkout(id: number): Observable<Workout> {
    // TODO: send the message _after_ fetching the workout
    this.messageService.add(`WorkoutService: fetched workout id=${id}`);
    return of(WORKOUTS.find(workout => workout.id === id));
  }
}
