import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CourseFormComponent {
  coursesService = inject(CoursesService);
  router = inject(Router);
  fb = inject(FormBuilder);
  courseForm: FormGroup;
  facultyId: string | null = null;

  constructor() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.facultyId = decoded.user._id;
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid && this.facultyId) {
      const courseData = { ...this.courseForm.value, faculty: this.facultyId };
      this.coursesService.addCourse(courseData).subscribe({
        next: (response) => {
          console.log('Course added successfully:', response);
          this.router.navigate(['/courses']);
        },
        error: (err) => console.error('Error adding course:', err),
      });
    } else {
      console.error('Form is invalid or faculty ID is missing');
    }
  }
}
