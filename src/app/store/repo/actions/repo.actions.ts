import { createAction, props } from "@ngrx/store"
import { Repo } from "src/models/github-repos"
import { Error } from "../../error/error.reducer"

export const fetchRepos = createAction('[API/Github] fetch repos for user')
export const fetchReposSuccess = createAction('[API/Github] fetch repos for user success', props<{ payload: Repo[] }>())
export const fetchReposFailed = createAction('[API/Github] fetch repos for user failed', props<{ payload: Error }>())