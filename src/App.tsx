import React from 'react';

import HeaderPrimitive from './primitives/HeaderPrimitive';
import { Typography } from './primitives/Typography';

import Board from './components/Board';

import { fontSizes } from './themes/fontSizes';

export default class App extends React.Component {
  render() {
    return (
      <>
        <HeaderPrimitive>
          <Typography as={'h1'} fontSize={fontSizes.LARGE}>
            TO-DO Application
          </Typography>
        </HeaderPrimitive>
        <Board />
      </>
    );
  }
}
