import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:5000/api'; // Your backend URL

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses`);
  }

  registerCourse(courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/courses/${courseId}/register`, {});
  }
}
