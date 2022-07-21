import React from 'react';
import { StyledHeader, StyledMainHeading } from '../styledComponents/styledComponents';
import Navigation from './Navigation';

export default function Header({ onClick }: { onClick: () => void }) {
  return (
    <StyledHeader>
      <StyledMainHeading>TO-DO application</StyledMainHeading>
      <Navigation onClick={onClick}></Navigation>
    </StyledHeader>
  );
}
