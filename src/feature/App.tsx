import React, { useState } from 'react';
import Header from '../components/Header';
import Board from './Board';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthorizedPage from '../components/AuthorizedPage';
import AssignmentPage from '../components/AssignmentPage';
import PageNotFound from '../components/PageNotFound';
// import { GlobalStyle } from '../styledComponents/styledComponents';

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuth, setIsAuth] = useState(true);

  return (
    <>
      {/*<GlobalStyle />*/}
      <Header />
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
