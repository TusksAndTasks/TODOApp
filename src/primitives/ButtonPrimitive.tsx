import React from 'react';

export class ButtonPrimitive extends React.PureComponent<{
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}> {
  render() {
    const { onClick, className, children } = this.props;
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
}
