import React from 'react';
import { StyledMainHeading, StyledNavLink } from '../styledComponents/styledComponents';

export default function Header() {
  return (
    <header>
      <StyledMainHeading>TO-DO application</StyledMainHeading>
      <StyledNavLink to="/">Main</StyledNavLink>
      <StyledNavLink to="/Authorized">Auth</StyledNavLink>
    </header>
  );
}
