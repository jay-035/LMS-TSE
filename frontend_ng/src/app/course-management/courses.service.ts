import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseURL = 'http://localhost:5000/api';

  http = inject(HttpClient);

  constructor() {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Get token from localStorage
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getCourses() {
    return this.http.get(`${this.baseURL}/courses`, this.getAuthHeaders());
  }

  getCourseDetails(id: any) {
    return this.http.get(`${this.baseURL}/courses/${id}`, this.getAuthHeaders());
  }

  registerForCourse(id: any) {
    return this.http.post(
      `${this.baseURL}/courses/${id}/register`,
      {}, 
      this.getAuthHeaders()
    );
  }

  addCourse(form: any) {
    return this.http.post(`${this.baseURL}/courses`, form, this.getAuthHeaders());
  }
}
