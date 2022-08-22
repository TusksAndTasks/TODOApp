import React from 'react';

import HeaderPrimitive from './primitives/HeaderPrimitive';

import Board from './components/Board';

import Typography, { TypographyMode } from './primitives/Typography';

export default function App() {
  return (
    <>
      <HeaderPrimitive>
        <Typography as="h1" mode={TypographyMode.HEADING}>
          TO-DO application
        </Typography>
      </HeaderPrimitive>
      <Board />
    </>
  );
}
