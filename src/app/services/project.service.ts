import { Injectable } from '@angular/core';
import { Repo, RepoWithCommit } from 'src/models/github-repos';
import { catchError, map, Observable, of, switchMap, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Activity } from 'src/models/repo-commit-activity';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  private projects: Observable<Repo[] | string> = of('Must fetch projects');
  private getUrl = environment.apiURL.replace('OWNER', 'Thegajout');
  private detailsUrl = environment.statsApiUrl;

  getProjects() {
    this.projects = this.http.get<Repo[]>(this.getUrl).pipe(
      map((repo) =>
        repo.sort(
          (a: { pushed_at: Date }, b: { pushed_at: Date }) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        )
      ),
      catchError((error) => {
        switch (error.status) {
          case 404:
            return of('Page not found');
          case 403:
            console.log(error);
            return of(
              'Unauthorised acess: Github api refused to awnser request'
            );
          default:
            return of('There was a problem: ' + error.message);
        }
      })
    );
  }

  get projectData$(): Observable<RepoWithCommit[] | string> {
    return this.projects.pipe(
      switchMap((project) => {
        return Array.isArray(project)
          ? forkJoin(
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
                          (previousValue, currentvalue) =>
                            previousValue + currentvalue.total,
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
            )
          : of(project);
      })
    );
  }

  get projects$(): Observable<Repo[] | string> {
    return this.projects;
  }
}
