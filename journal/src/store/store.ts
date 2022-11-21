import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/'

export const store = configureStore({
  //!Creamos los espacios (slice) en el store
  reducer: {
    //! authSlice nos devuelve el metodo reducer y la propiedad actions
    authReducer:authSlice.reducer
   
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch