import { Routes } from '@angular/router';
import { LoginComponent } from './user-management/login/login.component';
import { CoursesComponent } from './course-management/courses/courses.component';
import { CourseDetailsComponent } from './course-management/course-details/course-details.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { CourseFormComponent } from './course-management/course-form/course-form.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "courses", component: CoursesComponent },
    { path: "student/courses/:id", component: CourseDetailsComponent },
    { path: "faculty/courses/:id", component: CourseFormComponent },
    { path: 'course-details/:id', component: CourseDetailsComponent },
    { path: "course-form", component: CourseFormComponent },
];
