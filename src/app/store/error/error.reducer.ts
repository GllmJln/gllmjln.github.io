import { EntityState, createEntityAdapter, EntityAdapter } from "@ngrx/entity"
import { createFeatureSelector, createReducer } from "@ngrx/store"

export interface Error {
    message: string
}

export const STORE_ERROR_STATE = "error"

export interface ErrorState extends EntityState<Error> { }

export const errorStateAdapter: EntityAdapter<Error> = createEntityAdapter<Error>()

export const initialErrorState = errorStateAdapter.getInitialState()

export const errorReducer = createReducer(
    initialErrorState,
)


export const errorFeatureState = createFeatureSelector<ErrorState>(STORE_ERROR_STATE);