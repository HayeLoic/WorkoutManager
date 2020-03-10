import { Component, OnInit } from '@angular/core';
import { Workout } from '../models/workout';
import { WORKOUTS } from '../mocks/mock-workouts';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  workouts: Workout[] = WORKOUTS;
  selectedWorkout: Workout;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(workout: Workout): void {
    this.selectedWorkout = workout;
  }

}
