import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {IUser} from '../interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null

  constructor(private http: HttpClient) {

  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(environment.apiEndpoint + '/auth/register', user)
  }

  login(user: IUser): Observable<{token: string}> {
    return this.http.post<{token: string}>(environment.apiEndpoint + '/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
  }

  public test(): Observable<any> {
    console.log('isTest');

    return this.http.get(environment.apiEndpoint + '/auth/test')
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }

  setToken(token: string) {
    this.token = token
  }
  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }


}
