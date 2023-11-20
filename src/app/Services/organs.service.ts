import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Categorie} from "../Models/categorie";
import {catchError, map, Observable, throwError} from "rxjs";
import {Organ} from "../Models/organ";

@Injectable({
  providedIn: 'root'
})
export class OrgansService {

  constructor( private http: HttpClient) { }

  private url = 'http://localhost:8080/api/v1/objet3d';
  //private url = ' http://16.170.228.21:32008/api/v1/objet3d';
  errMSG!: string;
  organs: Organ[] = [];
  getOrgans(): Observable<Organ[]> {
    return this.http.get<Organ[]>(this.url)
        .pipe(
            map((data: Organ[]) => {
              this.organs=data
              return this.organs;

            }),
            catchError((err) => {
              this.errMSG = "Can't get the list of the categories";

              return throwError(err);
            })
        );
  }


}
