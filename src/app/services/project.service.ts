import { Injectable } from '@angular/core';
import { Repo, RepoWithCommit } from 'src/models/github-repos';
import { catchError, map, Observable, of, switchMap, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Activity } from 'src/models/repo-commit-activity';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  private projects: Observable<Repo[] | undefined> = of(undefined);
  private getUrl = environment.apiURL.replace('OWNER', 'Thegajout');
  private detailsUrl = environment.statsApiUrl;

  getProjects() {
    this.projects = this.http.get<Repo[]>(this.getUrl).pipe(
      map((repo) => repo.sort(sortByDate)),
      catchError((error) => {
        switch (error.status) {
          case 404:
            this.errorService.addError('Page not found');
            break;
          case 403:
            console.log(error);
            this.errorService.addError(
              'Unauthorised acess: Github api refused to awnser request'
            );
            break;
          default:
            this.errorService.addError('There was a problem: ' + error.message);
            break;
        }
        return of(undefined);
      })
    );
  }

  get projectData$(): Observable<RepoWithCommit[] | undefined> {
    return this.projects.pipe(
      switchMap((project) => {
        if (!project) {
          return of(undefined);
        }
        return forkJoin(
          project.map((project) => {
            return this.http
              .get<Activity[]>(
                this.detailsUrl.replace('OWNER/REPO', project.full_name)
              )
              .pipe(
                map((activity) => {
                  return {
                    ...project,
                    commits: activity.reduce(
                      (previousValue, currentValue) =>
                        previousValue + currentValue.total,
                      0
                    ),
                  };
                }),
                catchError(() =>
                  of({
                    ...project,
                  })
                )
              );
          })
        );
      })
    );
  }

  get projects$(): Observable<Repo[] | undefined> {
    return this.projects;
  }
}

const sortByDate = (a: { pushed_at: Date }, b: { pushed_at: Date }) => {
  return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
};
