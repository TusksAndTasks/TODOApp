import React from 'react';
import { IAssignment, IFormProps, IFormState, IValidationError } from '../types/interfaces';
import { FormInput } from './FormInput';
import FormSubmit from './FormSubmit';
import InputLabel from './InputLabel';
import ValidationMessage from './ValidationMessage';

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
    const { id } = this.state.assignmentData;
    const keys = Object.keys(this.state.assignmentData) as Array<keyof IAssignment>;
    const inputId = id > -1 ? `${id}-upd` : `${id}-create`;
    return keys.map((key) => {
      if (key != 'id') {
        return (
          <React.Fragment key={key}>
            {this.generateLabel(inputId, key)}
            <FormInput
              name={key}
              value={this.state.assignmentData[key]}
              onChange={this.handleInput}
              id={inputId}
            />
          </React.Fragment>
        );
      }
    });
  }

  generateLabel(id: string, key: string) {
    return <InputLabel id={id} name={key} />;
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

  render() {
    const inputs = this.generateInputs() as JSX.Element[];
    return (
      <form
        className="assignment-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!this.state.isValid) {
            this.setState((state) => ({ ...state, error: { ...state.error, isActive: true } }));
          } else {
            this.setState((state) => ({ ...state, error: { ...state.error, isActive: false } }));
            this.props.toggleForm();
          }
        }}
      >
        {inputs}
        {this.state.error.isActive && this.state.error.errorMessage ? (
          <ValidationMessage message={this.state.error.errorMessage} />
        ) : null}
        <FormSubmit
          onSubmit={this.props.onSubmit}
          submitData={this.state.assignmentData}
          isValid={this.state.isValid}
        />
      </form>
    );
  }
}
