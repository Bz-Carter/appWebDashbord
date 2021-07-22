import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class RestService {
  abstract endpoint(): string;

  constructor(private http: HttpClient) {}

  get url() {
    return `${environment.api}/${this.endpoint()}`;
  }

  all(page?: number) {
    let url = this.url;

    if (page) {
      url += `?page=${page}`;
    }
    return this.http.get(url);
  }

  get(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  create(data) {
    return this.http.post(this.url, data);
  }

  update(id: number, data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
