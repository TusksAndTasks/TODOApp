import React from 'react';
import { useLocation } from 'react-router-dom';
import { IAssignment } from '../types/interfaces';
import Typography, { TypographyMode } from '../primitives/Typography';
import { colors } from '../themes/colors';
import styled from 'styled-components';

interface ILocation {
  pathname: string;
  state: IAssignment;
}

function AssigmentPage() {
  const location = useLocation();
  const { title, description, done, author } = (location as ILocation).state;
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
    </FullAssignment>
  );
}

export default React.memo(AssigmentPage);

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
