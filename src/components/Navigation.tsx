import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ButtonPrimitive, { buttonModes } from '../primitives/ButtonPrimitive';

export default function Navigation({ onClick }: { onClick: () => void }) {
  return (
    <StyledNav>
      <StyledNav>
        <StyledNavLink to="/" exact>
          Main
        </StyledNavLink>
        <StyledNavLink to="/auth" exact>
          Info about you
        </StyledNavLink>
      </StyledNav>
      <ButtonPrimitive onClick={onClick} mode={buttonModes.AUTH}>
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
