import React from 'react';

import { ButtonPrimitive } from '../primitives/ButtonPrimitive';

import Form from './Form';

import { IRouterProps, IRouterState } from '../types/interfaces';

export default class FormRouter extends React.Component<IRouterProps, IRouterState> {
  constructor(props: IRouterProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleForm = () => {
    this.setState((state) => ({ ...state, isOpen: !state.isOpen }));
  };

  render() {
    return this.state.isOpen ? (
      <div className="form-container">
        <ButtonPrimitive className="button-like" onClick={this.toggleForm}>
          Close
        </ButtonPrimitive>
        <Form
          onSubmit={this.props.onClick}
          assigment={this.props.assigment}
          toggleForm={this.toggleForm}
        />
      </div>
    ) : (
      <div className="form-data-container">
        {this.props.children}
        <ButtonPrimitive className="button-like" onClick={this.toggleForm}>
          {this.props.children ? 'Refactor task' : 'Create task'}
        </ButtonPrimitive>
      </div>
    );
  }
}
