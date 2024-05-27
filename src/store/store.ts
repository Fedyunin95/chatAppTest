import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./slices/apiSlice.tsx";
import todoListReducer from "./slices/todoListSlice.tsx";

const rootReducer = combineReducers({
  todoList: todoListReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];