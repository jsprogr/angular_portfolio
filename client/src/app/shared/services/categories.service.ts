import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Category, Message } from '../interfaces';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient){}

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiEndpoint + '/category')
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(environment.apiEndpoint + `/category/${id}`)
  }

  create(name: string, image?: File): Observable<Category> {
    const fd = new FormData()
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)

    return this.http.post<Category>(environment.apiEndpoint + '/category', fd)
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData()
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)

    return this.http.patch<Category>(environment.apiEndpoint + `/category/${id}`, fd)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(environment.apiEndpoint + `/category/${id}`)
  }
}
