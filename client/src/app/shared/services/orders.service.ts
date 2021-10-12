import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order } from '../interfaces';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {

  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(environment.apiEndpoint + '/order', order)
  }

  fetch(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>(environment.apiEndpoint + '/order', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }


}
