import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
import { CommonModule } from '@angular/common';  // Add CommonModule

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],  // Add CommonModule to imports
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent {
  coursesService = inject(CoursesService);
  route = inject(ActivatedRoute);

  course: any; // To hold the course details
  errorMessage: string | null = null; // To hold error message
courseId:any;
  constructor() {
    this.courseId = this.route.snapshot.paramMap.get('id'); // Get course ID from route
    if (this.courseId) {
      this.coursesService.getCourseDetails(this.courseId).subscribe({
        next: (data) => (this.course = data),
        error: (err) => {
          console.error('Failed to fetch course details', err);
          this.errorMessage = 'Failed to load course details. Please try again later.';
        },
      });
    }
  }

  onRegister(): void {
    if (this.course) {
      this.coursesService.registerForCourse(this.courseId).subscribe({
        next: () => {
          alert('Successfully registered for the course!');
        },
        error: (err: any) => {
          console.error('Failed to register', err);
          this.errorMessage = 'Registration failed. Please try again later.';
        },
      });
    }
  }
}
