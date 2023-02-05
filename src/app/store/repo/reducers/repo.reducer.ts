import { Repo } from "src/models/github-repos";
import { EntityState, createEntityAdapter, EntityAdapter } from "@ngrx/entity"
import { createFeatureSelector, createReducer, on } from "@ngrx/store"
import { fetchReposSuccess } from "../actions/repo.actions";

export const STORE_REPO_STATE = "repo"


export interface RepoState extends EntityState<Repo> { }

export const repoStateAdapter: EntityAdapter<Repo> = createEntityAdapter<Repo>()

export const initialRepoState = repoStateAdapter.getInitialState()
export const repoReducer = createReducer(
    initialRepoState,
    on(fetchReposSuccess, (state, action) => repoStateAdapter.setAll(action.payload, state))
)
export const repoFeatureState = createFeatureSelector<RepoState>(STORE_REPO_STATE);