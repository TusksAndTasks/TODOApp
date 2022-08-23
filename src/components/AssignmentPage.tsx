import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Typography, { TypographyMode } from '../primitives/Typography';

import { colors } from '../themes/colors';

import { IAssignment } from '../types/interfaces';

interface ILocation {
  pathname: string;
  state: IAssignment;
}

function AssignmentPage() {
  const location = useLocation();
  const { title, description, done, author, file } = (location as ILocation).state;
  const status = done ? 'done' : 'undone';

  return (
    <FullAssignment done={done}>
      <Typography as="h2" mode={TypographyMode.HEADING} color={colors.WHITE}>
        {title}
      </Typography>
      <Typography as="p" mode={TypographyMode.PARAGRAPH} color={colors.BLACK}>
        {description}
      </Typography>
      <Typography as="p" mode={TypographyMode.PARAGRAPH} color={colors.BLACK}>
        {`Status: ${status}`}
      </Typography>
      <Typography as="p" mode={TypographyMode.PARAGRAPH} color={colors.BLACK}>
        {`Author: ${author}`}
      </Typography>
      {file ? (
        <StyledFullImage src={file} alt="custom pic" />
      ) : (
        <Typography as="p" mode={TypographyMode.PARAGRAPH} color={colors.BLACK}>
          No picture for this task
        </Typography>
      )}
    </FullAssignment>
  );
}

export default React.memo(AssignmentPage);

export const FullAssignment = styled.div<{ done: boolean }>`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 20%;
  margin-top: 100px;
  border-radius: 25px;
  border: 1px solid #dcd3d3;
  box-shadow: 0 -2px 2px 2px gray;
  box-sizing: border-box;
  background-color: ${(props) => (props.done ? colors.BLUE : colors.PURPLE)};
`;

const StyledFullImage = styled.img`
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
