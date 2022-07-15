import React from 'react';

export default class InputLabel extends React.PureComponent<{ id: string; name: string }> {
  render() {
    return <label htmlFor={this.props.id}>{this.props.name}</label>;
  }
}
