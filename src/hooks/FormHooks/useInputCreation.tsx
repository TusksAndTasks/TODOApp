import React from 'react';

import InputPrimitive from '../../primitives/InputPrimitive';
import Typography from '../../primitives/Typography';

import { IAssignmentData, InputTypes } from '../../types/interfaces';
import styled from 'styled-components';

type useInputCreationProps = {
  inputsState: IAssignmentData;
  id: number;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function useInputCreation({ inputsState, id, handleInput }: useInputCreationProps) {
  function generateLabel(id: string, key: string) {
    return (
      <Typography as="label" id={id}>
        {key === 'file' && inputsState.file ? (
          <PreviewImage src={inputsState.file} alt="custom pic" />
        ) : (
          key
        )}
      </Typography>
    );
  }

  function generateInputs() {
    const keys = Object.keys(inputsState) as Array<keyof IAssignmentData>;
    const inputId = id > -1 ? `${id}-upd` : `${id}-create`;
    return keys.map((key) => {
      return (
        <React.Fragment key={key}>
          {generateLabel(inputId, key)}
          <InputPrimitive
            type={InputTypesMap[key]}
            name={key}
            value={inputsState[key]}
            onChange={handleInput}
            id={inputId}
          />
        </React.Fragment>
      );
    });
  }

  return generateInputs() as JSX.Element[];
}

const InputTypesMap: Record<keyof IAssignmentData, InputTypes> = {
  title: InputTypes.TEXT,
  description: InputTypes.TEXT,
  done: InputTypes.CHECKBOX,
  author: InputTypes.TEXT,
  file: InputTypes.FILE,
};

const PreviewImage = styled.img`
  width: 150px;
  height: auto;
`;
