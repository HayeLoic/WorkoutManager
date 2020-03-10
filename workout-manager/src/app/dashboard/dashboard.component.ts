import { Component, OnInit } from '@angular/core';
import { Workout } from '../models/workout';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
  }

  getHeroes(): void {
    this.workoutService.getWorkouts()
      .subscribe(workouts => this.workouts = workouts.slice(1, 5));
  }
}
