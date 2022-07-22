import React from 'react';
import { StyledHeader, StyledMainHeading } from '../styledComponents/styledComponents';
import Navigation from './Navigation';

export default function Header() {
  return (
    <StyledHeader>
      <StyledMainHeading>TO-DO application</StyledMainHeading>
      <Navigation></Navigation>
    </StyledHeader>
  );
}
