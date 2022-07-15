import React from 'react';
import { IRouterProps, IRouterState } from '../types/interfaces';
import Form from '../components/Form';

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
        <button onClick={() => this.toggleForm()}>Close</button>
        <Form
          onSubmit={this.props.onClick}
          assigment={this.props.assigment}
          toggleForm={this.toggleForm}
        />
      </div>
    ) : (
      <div className="form-data-container">
        {this.props.children}
        <button onClick={() => this.toggleForm()}>
          {this.props.children ? 'Refactor task' : 'Create task'}
        </button>
      </div>
    );
  }
}
