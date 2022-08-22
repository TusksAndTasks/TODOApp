import React, { useCallback, useState } from 'react';

import HeaderPrimitive from './primitives/HeaderPrimitive';

import Board from './components/Board';

import Typography, { TypographyMode } from './primitives/Typography';
import { Redirect, Route, Switch } from 'react-router-dom';
import AssigmentPage from './components/AssigmentPage';
import AuthorizedPage from './components/AuthorizedPage';
import Navigation from './components/Navigation';
import PageNotFound from './components/PageNotFound';

export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  const toggleAuth = useCallback(() => {
    setIsAuth(!isAuth);
  }, [isAuth]);

  return (
    <>
      <HeaderPrimitive>
        <Typography as="h1" mode={TypographyMode.HEADING}>
          TO-DO application
        </Typography>
      </HeaderPrimitive>
      <Navigation onClick={toggleAuth}></Navigation>
      <Switch>
        <Route path="/" component={Board} exact></Route>
        <Route path="/assignment/:id" component={AssigmentPage}></Route>
        <Route path="/auth" exact>
          {isAuth ? <AuthorizedPage /> : <Redirect to="/" exact />}
        </Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </>
  );
}
