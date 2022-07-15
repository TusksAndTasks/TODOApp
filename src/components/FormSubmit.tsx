import React from 'react';
import { ISubmitForm } from '../types/interfaces';

export default class FormSubmit extends React.Component<ISubmitForm> {
  handleClick() {
    const { submitData, isValid } = this.props;
    if (isValid) {
      this.props.onSubmit(submitData);
    }
  }

  render() {
    return <input type="submit" value="Confirm action" onClick={() => this.handleClick()} />;
  }
}
