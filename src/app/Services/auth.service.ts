import {Injectable, OnInit} from '@angular/core';
import {User} from "../Models/user.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  private url ="http://localhost:8080/api/v1/auth/";
  //private url =" http://16.170.228.21:32008/api/v1/auth/";
  authenticatedUser = {} as User;
  authenticated:boolean=false
  msgErr!:string
  ngOnInit(): void {

  }
  constructor( private http:HttpClient) {

  }
    login(email:string,password:string): Observable<User> {

        // Create headers
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        // Create body
        const body = {
            email: email,
            password: password
        };

        // Send post request with defined headers and body
        return this.http.post(this.url+"authenticate", body, { headers })
            .pipe(
                map((data:any) => {
                    this.authenticatedUser.role=data["roles"]
                    this.authenticatedUser.accesToken=data["access_token"]
                    this.authenticatedUser.refreshToken=data["refresh_token"]
                    this.authenticatedUser.id=data["user_id"]
                    this.authenticated=true
                    return this.authenticatedUser;
                }),
                catchError(error => {
                    this.msgErr="Incorrect Credentials";
                    return throwError(error);
                })
            );
    }





}
