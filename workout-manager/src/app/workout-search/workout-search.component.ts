import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../models/workout';

@Component({
  selector: 'app-workout-search',
  templateUrl: './workout-search.component.html',
  styleUrls: ['./workout-search.component.scss']
})
export class WorkoutSearchComponent implements OnInit {
  workouts$: Observable<Workout[]>;
  private searchTerms = new Subject<string>();

  constructor(private workoutService: WorkoutService) { }

   // Push a search term into the observable stream.
   search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.workouts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.workoutService.searchWorkouts(term)),
    );
  }

}
