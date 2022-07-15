import React from 'react';

export default class ValidationMessage extends React.PureComponent<{ message: string }> {
  render() {
    return <div className="validation-message">{this.props.message}</div>;
  }
}
