import {FC} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {MainLayout} from "../index.ts";
import {useAppSelector} from "../../hooks/redux.ts";

export const PrivateRouts: FC = () => {
  const {auth} = useAppSelector(state => state.todoList)
  const location = useLocation();

  if (auth) {
    return (
      <MainLayout>
        <Outlet/>
      </MainLayout>
    )
  } else {
    return (<Navigate to="/login" state={{from: location}} replace/>)
  }
}