import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position, Message } from '../interfaces'
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PositionSevice {
  constructor(private http: HttpClient) {

  }

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(environment.apiEndpoint + `/position/${categoryId}`)
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>(environment.apiEndpoint + '/position', position)
  }

  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(environment.apiEndpoint + `/position/${position._id}`, position)
  }

  delete(position: Position): Observable<Message> {
    return this.http.delete<Message>(environment.apiEndpoint + `/position/${position._id}`)
  }
}
