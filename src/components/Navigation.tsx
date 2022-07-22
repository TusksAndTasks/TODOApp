import { StyledNav, StyledNavLink, StyledToggle } from '../styledComponents/styledComponents';
import React from 'react';
import { useDispatch } from 'react-redux';
import { GlobalDispatch } from '../reedux/store';
import { toggleAuth } from '../reedux/slices/AuthorizationSlice';

export default function Navigation() {
  const authDispatch = useDispatch() as GlobalDispatch;
  return (
    <StyledNav>
      <StyledNav>
        <StyledNavLink to="/">Main</StyledNavLink>
        <StyledNavLink to="/Authorized">Info about you</StyledNavLink>
      </StyledNav>
      <StyledToggle onClick={() => authDispatch(toggleAuth())}>Toggle auth</StyledToggle>
    </StyledNav>
  );
}
