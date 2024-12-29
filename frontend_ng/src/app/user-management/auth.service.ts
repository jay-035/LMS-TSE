import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string, role: string,) {
    return this.http.post(`${this.baseURL}/register`, { name, email, password, role});
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseURL}/login`, { email, password });
  }
}