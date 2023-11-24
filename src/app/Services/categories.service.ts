import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import { Categorie } from '../Models/categorie';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private http: HttpClient) { }

    private url = 'http://localhost:8080/api/v1/category';
    //private url = ' http://16.170.228.21:32008/api/v1/category';
    errMSG!: string;
    categories: Categorie[] = [];

    addCategory(img: File, name: string, desc: string): Observable<any> {
        const formData = new FormData();
        formData.append('img', img);
        formData.append('name', name);
        formData.append('desc', desc);

        return this.http.post<any>(`${this.url}/add`, formData);
    }
    getCategories(): Observable<Categorie[]> {
        return this.http.get<Categorie[]>(this.url)
            .pipe(
                map((data: Categorie[]) => {
                    this.categories=data
                    return this.categories;

                }),
                catchError((err) => {
                    this.errMSG = "Can't get the list of the categories";

                    return throwError(err);
                })
            );
    }
    deleteCategory(id: number): Observable<string> {
        const url = `${this.url}/delete/${id}`;
        return this.http.delete<string>(url);
    }
    editCategory( updatedCategoryData: Categorie): Observable<Categorie> {
    const url = `${this.url}/update`;
    return this.http.put<Categorie>(url, updatedCategoryData)
      .pipe(
        catchError((err) => {
          // Handle error, if needed
          return throwError(err);
        })
      );
  }

    updateImageCategory(id: number, image: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('id', id.toString());
        formData.append('img', image);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data'); // Usually not needed, Angular handles this

        return this.http.put<string>(`${this.url}/updateImg`, formData, { headers });
    }

}
