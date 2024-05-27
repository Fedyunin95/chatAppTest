import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "../store.ts";

// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from '@reduxjs/toolkit/query'
// import {toast} from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).todoList.auth;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});


// TODO Функционал для обновления токена пользователя.

// let isRefreshing = false; // Переменная состояния для отслеживания процесса обновления токена

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   if (isRefreshing) {
//     return Promise.reject("Refresh token is already in progress"); // Прерываем запрос, если процесс обновления токена уже выполняется
//   }
//
//   const refreshTokenState = (api.getState() as RootState).auth.refresh_token;
//
//   try {
//     let result = await baseQuery(args, api, extraOptions);
//
//     if (result.error && result.error.status === 401) {
//       isRefreshing = true; // Устанавливаем флаг, что процесс обновления токена начался
//
//       // try to get a new token
//       const refreshResult: any = await baseQuery({
//         url: '/refresh',
//         method: 'POST',
//         body: {refresh_token: refreshTokenState}
//       }, api, extraOptions);
//
//       if (refreshResult.data) {
//         // store the new token in the store or wherever you keep it
//         api.dispatch(refreshToken({
//           access_token: refreshResult.data.access_token,
//           refresh_token: refreshResult.data.refresh_token
//         }));
//
//         // retry the initial query
//         result = await baseQuery(args, api, extraOptions);
//       } else {
//         // refresh failed - do something like redirect to login or show a "retry" button
//         api.dispatch(logOut());
//       }
//
//       isRefreshing = false; // Сбрасываем флаг после завершения обновления токена
//     }
//
//     return result;
//   } catch (e: unknown) {
//     const error = e as { status: number; data: { detail: { msg: string } | string } };
//     isRefreshing = false; // Сбрасываем флаг при возникновении ошибки
//
//     if (typeof error.data.detail === 'object' && 'msg' in error.data.detail) {
//       toast.error(error.data.detail.msg);
//     } else if (typeof error.data.detail === 'string') {
//       toast.error(error.data.detail);
//     } else {
//       toast.error('Неизвестная ошибка!');
//     }
//     throw error;
//   }
// };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: []
});
