import styled, { css } from 'styled-components';

// export const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
// `;
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
`;

export const AssignmentDescription = styled.p<{ status: string }>`
  ${status}
`;

export const StyledMessage = styled.div`
  text-align: center;
  background-color: rgba(182, 13, 73, 0.74);
  color: white;
  padding: 10px;
`;

export const StyledMainHeading = styled.h1`
  background-color: rgba(12, 107, 213, 0.74);
  text-align: center;
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
  & label {
    font-family: 'Roboto Slab', serif;
  }

  & input[type='text'] {
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

  & h2,
  & p {
    font-family: 'Roboto Slab', serif;
  }
`;
