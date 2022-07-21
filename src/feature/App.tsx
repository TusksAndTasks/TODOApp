import React, { useState } from 'react';
import Header from '../components/Header';
import Board from './Board';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthorizedPage from '../components/AuthorizedPage';
import AssignmentPage from '../components/AssignmentPage';
import PageNotFound from '../components/PageNotFound';
import { GlobalStyle } from '../styledComponents/styledComponents';

export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  function toggleAuth() {
    setIsAuth(!isAuth);
  }

  return (
    <>
      <GlobalStyle />
      <Header onClick={toggleAuth} />
      <Routes>
        <Route path="/" element={<Board />}></Route>
        <Route
          path="Authorized"
          element={isAuth ? <AuthorizedPage /> : <Navigate to="/" replace />}
        ></Route>
        <Route path="assignment/:id" element={<AssignmentPage />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}
