import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent {
  coursesService = inject(CoursesService);
  route = inject(ActivatedRoute);

  course: any; // To hold the course details

  constructor() {
    const courseId = this.route.snapshot.paramMap.get('id'); // Get course ID from route
    if (courseId) {
      this.coursesService.getCourseDetails(courseId).subscribe({
        next: (data) => (this.course = data),
        error: (err) => console.error('Failed to fetch course details', err),
      });
    }
  }

  onRegister(): void {
    if (this.course) {
      this.coursesService.registerForCourse(this.course._id).subscribe({
        next: () => {
          alert('Successfully registered for the course!');
        },
        error: (err: any) => console.error('Failed to register', err),
      });
    }
  }
}
