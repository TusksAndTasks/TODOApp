import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HeaderPrimitive from './primitives/HeaderPrimitive';
import Typography, { TypographyMode } from './primitives/Typography';

import Board from './components/Board';
import AssigmentPage from './components/AssignmentPage';
import AuthorizedPage from './components/AuthorizedPage';
import Navigation from './components/Navigation';
import PageNotFound from './components/PageNotFound';

import { GlobalState } from './redux/store';

export default function App() {
  const isAuth = useSelector((state: GlobalState) => state.authorization.auth);

  return (
    <>
      <HeaderPrimitive>
        <Typography as="h1" mode={TypographyMode.HEADING}>
          TO-DO application
        </Typography>
      </HeaderPrimitive>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Board />}></Route>
        <Route path="assignment/:id" element={<AssigmentPage />}></Route>
        <Route
          path="auth"
          element={isAuth ? <AuthorizedPage /> : <Navigate to="/" replace />}
        ></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}
