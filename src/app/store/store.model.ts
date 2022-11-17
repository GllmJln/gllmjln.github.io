import { ErrorState, STORE_ERROR_STATE, initialErrorState, errorReducer } from "./error/error.reducer";
import { RepoState, STORE_REPO_STATE, initialRepoState, repoReducer } from "./repo/repo.reducer";
import { ActionReducerMap } from "@ngrx/store"

export interface AppState {
    [STORE_ERROR_STATE]: ErrorState,
    [STORE_REPO_STATE]: RepoState
}

export const initialAppState: Record<keyof AppState, any> = {
    [STORE_ERROR_STATE]: initialErrorState,
    [STORE_REPO_STATE]: initialRepoState
}

export const reducers: ActionReducerMap<AppState> = {
    [STORE_ERROR_STATE]: errorReducer,
    [STORE_REPO_STATE]: repoReducer
}