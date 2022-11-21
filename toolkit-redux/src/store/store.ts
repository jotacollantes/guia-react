import { configureStore } from '@reduxjs/toolkit'
import {counterSlice} from './slices/counter'
import { pokemonSlice } from './slices/pokemon'
export const store = configureStore({
  reducer: {
    //! counterSlice nos devuelve el metodo reducer y la propiedad actions
    counterReducer:counterSlice.reducer,
    pokemonReducer:pokemonSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch