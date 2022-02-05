import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data): Observable<any> {
    return this.http.post(`${environment.api}/login`, data);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.api}/logout`, {});
  }

  user() {
    return this.http.get(`${environment.api}/user`);
  }

  updateInfo(data) {
    return this.http.put(`${environment.api}/users/info`, data);
  }

  updatePassword(data) {
    return this.http.put(`${environment.api}/users/password`, data);
  }
}
