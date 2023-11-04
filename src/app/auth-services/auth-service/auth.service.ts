import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';

const BASIC_URL = ['http://localhost:8080/'];
export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) {}

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + 'signup', signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http
      .post(BASIC_URL + 'authentication', loginRequest, { observe: 'response' })
      .pipe(
        tap((__) => this.log('User Authentication')),
        map((res: HttpResponse<any>) => {
          this.storage.saveUser(res.body);
          const bearerToken = res.headers.get(AUTH_HEADER);
        if (bearerToken) {
          const tokenLength = bearerToken.length;
          const extractedToken = bearerToken.substring(7, tokenLength);
          this.storage.saveToken(extractedToken);
        }
          return res;
        })
      );
  }

  log(messsage : String)
  {
        console.log("User Auth Servive"+messsage);
  }
}
