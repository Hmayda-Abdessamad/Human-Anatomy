import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

    addOrgan(categorie:string, name: string, desc: string,img:File,data:File): Observable<String> {
        const formData = new FormData();
        formData.append('img', img);
        formData.append('name', name);
        formData.append('description', desc);
        formData.append("idCat",categorie);
        formData.append("data",data)
        return this.http.post<any>(`${this.url}/add`, formData);
    }

    deleteOrgan(id: number): Observable<string> {
        const url = `${this.url}/delete/${id}`;
        return this.http.delete<string>(url);
    }


}
