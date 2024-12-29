import { inject, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For async pipe
import { MatListModule } from '@angular/material/list';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, MatListModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  courses: any[] = [];

  coursesService = inject(CoursesService);
  router = inject(Router);

  constructor() {
    this.coursesService.getCourses().subscribe((result: any) => {
      this.courses = result;
    });
  }
  onCourseClick(course: any): void {
    this.router.navigate(['/course-details', course._id]);
  }



}
