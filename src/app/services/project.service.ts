import { Injectable } from '@angular/core';
import { Project } from 'src/models/project';
import { catchError, map, Observable, of, pluck } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  private url = environment.apiURL

  getProjects() {
    return this.http.get<Project[] | string>(this.url)
      .pipe(
        catchError((error) => {
          switch (error.status) {
            case 404:
              return of("Page not found")
            case 403:
              console.log(error)
              return of("Unauthorised acess: Github api refused to awnser request")
            default:
              return of("There was a problem: " + error.message)
          }
        })
      )
  }
}

