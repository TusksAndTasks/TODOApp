import React from 'react';

import { ITypographyProps } from '../types/interfaces';

export class Typography extends React.Component<ITypographyProps> {
  static defaultProps = {};

  shouldComponentUpdate(nextProps: Readonly<ITypographyProps>) {
    return nextProps.color !== this.props.color || nextProps.children !== this.props.children;
  }

  render() {
    return React.createElement(
      this.props.as as keyof HTMLElementTagNameMap,
      {
        className: this.props.className,
        style: {
          color: this.props.color,
          fontSize: this.props.fontSize,
        },
        ...this.props.additionalProps,
      },
      this.props.children
    );
  }
}

Typography.defaultProps = {
  as: 'span',
  className: 'standard',
};
