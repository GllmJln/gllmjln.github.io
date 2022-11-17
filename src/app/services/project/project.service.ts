import { Injectable } from '@angular/core';
import { Repo, RepoWithCommit } from 'src/models/github-repos';
import { catchError, map, Observable, of, switchMap, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Activity } from 'src/models/repo-commit-activity';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  private getUrl = environment.apiURL.replace('OWNER', 'Thegajout');
  private detailsUrl = environment.statsApiUrl;

  get projects$() {
    return this.http.get<Repo[]>(this.getUrl).pipe(
      map((repo) => repo.sort(sortByDate)),
    )
  }

  get projectData$(): Observable<RepoWithCommit[] | undefined> {
    return this.projects$.pipe(
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
}

const sortByDate = (a: { pushed_at: Date }, b: { pushed_at: Date }) => {
  return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
};
