import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "@/app/store/user/user.slice";

const rootReducer = combineReducers({
    User: userSlice.reducer,
})
export const store = configureStore({
    reducer: rootReducer,
})
export type TypeRootState = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch