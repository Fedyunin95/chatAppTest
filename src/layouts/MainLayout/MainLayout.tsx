import {Outlet} from "react-router-dom";
import {ReactNode, FC} from "react";
import { tss } from '../../helpers';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = () => {
  const {classes} = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <Outlet/>
      </div>
    </div>
  );
}

const useStyles = tss.create(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
    padding: 24
  },
}))