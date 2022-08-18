import React, { FormEvent } from 'react';

import { InputPrimitive } from '../primitives/InputPrimitive';
import { Typography } from '../primitives/Typography';

import { colors } from '../themes/colors';

import {
  IAssignment,
  IFormProps,
  IFormState,
  InputTypes,
  IValidationError,
} from '../types/interfaces';

export default class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    if (this.props.assigment) {
      this.state = {
        assignmentData: { ...this.props.assigment },
        isValid: false,
        error: {
          isActive: false,
          errorMessage: '',
        },
      };
    } else {
      this.state = {
        assignmentData: { title: '', description: '', id: -1, done: false },
        isValid: false,
        error: {
          isActive: false,
          errorMessage: '',
        },
      };
    }
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState((state) => ({
      ...state,
      assignmentData: { ...state.assignmentData, [name]: value },
    }));
  };

  generateInputs() {
    const { assignmentData } = this.state;
    const { id } = assignmentData;
    const keys = Object.keys(assignmentData) as Array<keyof IAssignment>;
    const inputId = id > -1 ? `${id}-upd` : `${id}-create`;
    return keys.map((key) => {
      if (key != 'id') {
        return (
          <React.Fragment key={key}>
            {this.generateLabel(inputId, key)}
            <InputPrimitive
              type={
                typeof assignmentData[key] === 'boolean' ? InputTypes.checkbox : InputTypes.text
              }
              name={key}
              value={assignmentData[key]}
              onChange={this.handleInput}
              id={inputId}
            />
          </React.Fragment>
        );
      }
    });
  }

  generateLabel(id: string, key: string) {
    return (
      <Typography as="label" additionalProps={{ htmlFor: id }}>
        {key}
      </Typography>
    );
  }

  validateForm() {
    const keys = Object.keys(this.state.assignmentData) as Array<keyof IAssignment>;
    let validationResult = true;
    let errorMessage = 'Make sure this fields are filled:';
    keys.forEach((prop) => {
      if (
        typeof this.state.assignmentData[prop] === 'string' &&
        this.state.assignmentData[prop] === ''
      ) {
        errorMessage = errorMessage + ` ${prop}-field`;
        validationResult = false;
      }
    });
    this.setState((state) => ({
      ...state,
      error: { ...state.error, errorMessage: validationResult ? '' : errorMessage },
      isValid: validationResult,
    }));
  }

  componentDidMount() {
    this.validateForm();
  }

  componentDidUpdate() {
    this.validateForm();
  }

  shouldComponentUpdate(nextProps: Readonly<IFormProps>, nextState: Readonly<IFormState>) {
    let shouldUpdate = false;
    const keys = Object.keys(this.state.assignmentData) as Array<keyof IAssignment>;
    const errorKeys = Object.keys(this.state.error) as Array<keyof IValidationError>;
    keys.forEach((key) => {
      if (this.state.assignmentData[key] !== nextState.assignmentData[key]) {
        shouldUpdate = true;
      }
    });

    errorKeys.forEach((key) => {
      if (this.state.error[key] !== nextState.error[key]) {
        shouldUpdate = true;
      }
    });

    return shouldUpdate;
  }

  handleClickOnSubmit = () => {
    if (this.state.isValid) {
      this.props.onSubmit(this.state.assignmentData);
    }
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.state.isValid) {
      this.setState((state) => ({ ...state, error: { ...state.error, isActive: true } }));
    } else {
      this.setState((state) => ({ ...state, error: { ...state.error, isActive: false } }));
      this.props.toggleForm();
    }
  };

  render() {
    const inputs = this.generateInputs() as JSX.Element[];
    return (
      <form className="assignment-form" onSubmit={this.handleSubmit}>
        {inputs}
        {this.state.error.isActive && this.state.error.errorMessage ? (
          <Typography as="p" className="validation-message" color={colors.WHITE}>
            {this.state.error.errorMessage}
          </Typography>
        ) : null}
        <InputPrimitive
          type={InputTypes.submit}
          value="Confirm action"
          className="button-like"
          onChange={this.handleClickOnSubmit}
        />
      </form>
    );
  }
}
