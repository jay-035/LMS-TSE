import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  standalone: false,
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(
      (response) => {
        this.courses = response;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  register(courseId: string): void {
    this.coursesService.registerCourse(courseId).subscribe(
      (response) => {
        alert('Successfully registered for the course');
      },
      (error) => {
        alert('Failed to register for the course');
      }
    );
  }
}
