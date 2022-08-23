import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import ButtonPrimitive, { buttonModes } from '../primitives/ButtonPrimitive';

import { GlobalDispatch } from '../redux/store';
import { toggleAuth } from '../redux/slices/AuthorizationSlice';

export default function Navigation() {
  const authDispatch = useDispatch() as GlobalDispatch;

  const handleClick = useCallback(() => authDispatch(toggleAuth()), []);

  return (
    <StyledNav>
      <StyledNav>
        <StyledNavLink to="/">Main</StyledNavLink>
        <StyledNavLink to="auth">Info about you</StyledNavLink>
      </StyledNav>
      <ButtonPrimitive onClick={handleClick} mode={buttonModes.AUTH}>
        Toggle auth
      </ButtonPrimitive>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  width: 100%;
  background-color: rgba(12, 107, 213, 0.74);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
`;

export const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-family: 'Roboto Slab', serif;
  font-size: 24px;

  &[class*='active'] {
    color: black;
  }
`;
