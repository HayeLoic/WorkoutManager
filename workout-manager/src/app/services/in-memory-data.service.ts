import { Injectable } from '@angular/core';
import { Workout } from '../models/workout';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {
  createDb() {
    const workouts: Workout[] = [
      { id: 1, name: 'Aphrodite Version Annie' },
      { id: 2, name: 'Workout 2' },
      { id: 3, name: 'Workout 3' },
      { id: 4, name: 'Workout 4' },
      { id: 5, name: 'Workout 5' }
    ];
    return {workouts};
  }

  genId(workouts: Workout[]): number {
    return workouts.length > 0 ? Math.max(...workouts.map(workout => workout.id)) + 1 : 1;
  }
}
