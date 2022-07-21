import { StyledNav, StyledNavLink, StyledToggle } from '../styledComponents/styledComponents';
import React from 'react';

export default function Navigation({ onClick }: { onClick: () => void }) {
  return (
    <StyledNav>
      <StyledNav>
        <StyledNavLink to="/">Main</StyledNavLink>
        <StyledNavLink to="/Authorized">Info about you</StyledNavLink>
      </StyledNav>
      <StyledToggle onClick={onClick}>Toggle auth</StyledToggle>
    </StyledNav>
  );
}
