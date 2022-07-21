import styled, { createGlobalStyle, css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
   body {
     margin: 0;
   }
`;
//   @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
//Это работает, но консоль пишет, что styled components такое не может нормально обрабатывать и советуют вставить ссылку напрмую в хтмл.

const toggleElem = css`
  width: 200px;
  font-size: 20px;
  background-color: #b9c6d5;
  border: none;
  border-radius: 15px;
  margin: 20px;
  transition: 0.5s;
  padding: 15px 20px;

  &:hover {
    background-color: #76a7ea;
    color: white;
  }
`;

export const StyledButton = styled.button`
  ${toggleElem}
`;

export const StyledInput = styled.input`
  ${toggleElem}
`;

const status = css<{ status: string }>`
  color: ${(props) =>
    props.status === 'done' ? 'rgba(12, 107, 213, 0.74)' : 'rgba(182, 13, 73, 0.74)'};
`;

export const AssignmentTitle = styled.h2<{ status: string }>`
  ${status};
  font-size: 2em;
`;

export const AssignmentDescription = styled.p<{ status: string }>`
  ${status};
  font-size: 1.5em;
`;

export const StyledMessage = styled.div`
  text-align: center;
  background-color: rgba(182, 13, 73, 0.74);
  color: white;
  padding: 10px;
`;

export const StyledHeader = styled.header`
  background-color: rgba(12, 107, 213, 0.74);
`;

export const StyledMainHeading = styled.h1`
  background-color: rgba(12, 107, 213, 0.74);
  text-align: center;
  color: white;
`;

export const StyledBoard = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const AssignmentTable = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 40px;
`;

const conditionalFormStyle = css<{ mode: string }>`
  width: ${(props) => (props.mode === 'create' ? '500px' : '300px')};
`;

export const StyledForm = styled.form<{ mode: string }>`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  border: ${(props) => (props.mode === 'create' ? 'none' : '1px solid red')};
  gap: 10px;
  background-color: aliceblue;
  border-radius: 0 0 25px 25px;
`;

export const FormContainer = styled.div<{ mode: string }>`
  display: flex;
  flex-flow: column;
  align-items: center;
  border: black solid 2px;
  gap: 10px;
  ${conditionalFormStyle};
  background-color: ${(props) => (props.mode === 'create' ? 'aliceblue' : 'white')};
  border-radius: 25px;
  &label {
    font-family: 'Roboto Slab', serif;
  }

  &input[type='text'] {
    width: 60%;
  }
`;

export const FormDataContainer = styled.div<{ mode: string; status: string }>`
  display: flex;
  flex-flow: column;
  align-items: center;
  border: gray solid 2px;
  background-color: ${(props) =>
    props.mode === 'create' ? '#ffd0d0' : props.status === 'done' ? '#d6f9e0' : '#e9e4be'};
  ${conditionalFormStyle};
  gap: 10px;
  text-align: center;
  border-radius: 25px;

  &h2,
  &p {
    font-family: 'Roboto Slab', serif;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: inherit;
  color: inherit;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledNav = styled.nav`
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

export const StyledPreviewImage = styled.img`
  width: 100px;
  height: auto;
`;

export const FullAssignment = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 20%;
  margin-top: 100px;
  background-color: #d9d1de;
  border-radius: 25px;
  border: 1px solid #dcd3d3;
  box-shadow: 0 -2px 2px 2px gray;
  box-sizing: border-box;
`;

export const StyledFullImage = styled.img`
  width: 75%;
  height: auto;
  transition: 1s;
  transition-delay: 0.5s;
  padding-bottom: 30px;

  &:hover {
    cursor: zoom-in;
    width: 95%;
  }
`;

const BasicUniquePage = css`
  width: 100%;
  height: 89.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Slab', serif;
  font-size: 30px;
`;

export const StyledAuthPage = styled.div`
  ${BasicUniquePage}
  background-color: #d5f1d5;
`;

export const StyledNotFoundPage = styled.div`
  ${BasicUniquePage}
  background-color: #f3d1d1;
`;

export const StyledToggle = styled.button`
  font-size: 12px;
  padding: 4px;
  background-color: white;
  color: black;
  border-radius: 25px;
  width: 120px;
  transition: 1s;
  margin: 2px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: black;
  }
`;
