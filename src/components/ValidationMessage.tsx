import React from 'react';

export default function ValidationMessage({ message }: { message: string }) {
  return <div className="validation-message">{message}</div>;
}
