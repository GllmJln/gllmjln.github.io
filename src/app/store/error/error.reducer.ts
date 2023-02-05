import { ActionCreatorProps, createAction, createFeatureSelector, createReducer, on, props } from "@ngrx/store"
import { ActionCreator, NotAllowedInPropsCheck } from "@ngrx/store/src/models"
import { fetchReposFailed } from "../repo/actions/repo.actions"

export interface Error {
    message: string
}

export const STORE_ERROR_STATE = "error"

export interface ErrorState {
    errors: Error[]
}

export const initialErrorState = { errors: [] }

export const errorReducer = createReducer(
    initialErrorState,
    // on(fetchReposFailed, (state, action) => ({ ...state, errors: [...state, action.payload] })),
)


export const errorFeatureState = createFeatureSelector<ErrorState>(STORE_ERROR_STATE);

// export const createFailureAction = (type: string, props: <P extends SafeProps, SafeProps = NotAllowedInPropsCheck<P>>() => ActionCreatorProps<P>) => {
//     createAction(type, props)
// }


// export function onMock(
//     ...args: (ActionCreator | Function)[]
// ): { reducer: Function; types: string[] } {
//     const reducer = args.pop() as Function
//     const types = args.reduce(
//         (result, creator) => [...result, (creator as ActionCreator).type],
//         [] as string[],
//     )
//     return { reducer, types }
// }