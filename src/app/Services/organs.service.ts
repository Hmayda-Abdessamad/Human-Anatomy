import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Categorie} from "../Models/categorie";
import {catchError, map, Observable, of, throwError} from "rxjs";
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

    addOrgan(categorie:string, name: string, desc: string,img:File,data:File): Observable<string>{
        const formData = new FormData();
        formData.append("idCat",categorie);
        formData.append('img', img);
        formData.append('name', name);
        formData.append("data",data)
        formData.append('description', desc);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');


        return this.http.post<string>(`${this.url}/add`, formData,{headers})
    }

    deleteOrgan(id: number): Observable<string> {
        const url = `${this.url}/delete/${id}`;
        return this.http.delete<string>(url);
    }

    getCategoryByObjectId(objectId: number): Observable<number> {
        const url = `${this.url}/category`;

        const params = new HttpParams().set('ObjectId', objectId.toString());

        return this.http.get<number>(url, { params });
    }

    editOrgan( updatedOrgan: Organ): Observable<String> {
        const url = `${this.url}/update`;
        return this.http.put<String>(url, updatedOrgan)
            .pipe(
                catchError((err) => {
                    // Handle error, if needed
                    return throwError(err);
                })
            );
    }

    updateOrganImage(id: number, image: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('id', id.toString());
        formData.append('img', image);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data'); // Usually not needed, Angular handles this

        return this.http.put<string>(`${this.url}/updateImg`, formData, { headers });
    }
    updateOrganModel(id: number, file: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('id', id.toString());
        formData.append('data', file);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data'); // Usually not needed, Angular handles this

        return this.http.put<string>(`${this.url}/updateImg`, formData, { headers });
    }
    findAllByCategory(cat: number): Observable<any> {
        return this.http.get(`${this.url}/category/${cat}`);
    }


}
