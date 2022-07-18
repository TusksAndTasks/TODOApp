import React from 'react';
import { StyledMessage } from '../styledComponents/styledComponents';

export default function ValidationMessage({ message }: { message: string }) {
  return <StyledMessage className="validation-message">{message}</StyledMessage>;
}
