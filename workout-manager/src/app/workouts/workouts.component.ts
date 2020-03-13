import { Component, OnInit } from '@angular/core';
import { Workout } from '../models/workout';
import { WorkoutService } from '../services/workout.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {
  workouts: Workout[];
  selectedWorkout: Workout;

  constructor(private workoutService: WorkoutService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutService.getWorkouts()
        .subscribe(workouts => this.workouts = workouts);
  }
}
