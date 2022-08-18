import React from 'react';

export default class HeaderPrimitive extends React.Component<{ children: React.ReactNode }> {
  render() {
    return <header>{this.props.children}</header>;
  }
}
