import { Component, OnInit, Input } from '@angular/core';
import { Workout } from '../models/workout';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.workoutService.getWorkout(id)
      .subscribe(workout => this.workout = workout);
  }

  goBack(): void {
    this.location.back();
  }
}
