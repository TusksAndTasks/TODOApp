import React from 'react';
import Header from '../components/Header';
import Board from './Board';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Board />
      </>
    );
  }
}
