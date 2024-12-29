import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseURL = 'http://localhost:5000/api';

  http = inject(HttpClient);
  constructor() { }
  getCourses() {
    return this.http.get(`${this.baseURL}/courses`);
  }

  getCourseDetails(id: any) {
    return this.http.get(`${this.baseURL}/courses/${id}`);
  }

  registerForCourse(id: any) {
    return this.http.post(`${this.baseURL}/courses/${id}/register`, localStorage.getItem('token'));
  }
}
