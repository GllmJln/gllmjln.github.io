import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { ProjectService } from 'src/app/services/project/project.service';
import { fetchRepos, fetchReposFailed, fetchReposSuccess } from './repo.actions';

@Injectable()
export class ReposEffects {
    Repos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchRepos),
            switchMap(() =>
                this.repoService.projects$.pipe(
                    map(repo => fetchReposSuccess({ payload: repo })),
                    catchError(e => of(fetchReposFailed({ payload: e })))
                )
            )
        )
    );
    constructor(private actions$: Actions, private repoService: ProjectService) { }
}