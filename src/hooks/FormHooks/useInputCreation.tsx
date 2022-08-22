import React from 'react';

import InputPrimitive from '../../primitives/InputPrimitive';
import Typography from '../../primitives/Typography';

import { IAssignmentData, InputTypes } from '../../types/interfaces';

type useInputCreationProps = {
  inputsState: IAssignmentData;
  id: number;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function useInputCreation({ inputsState, id, handleInput }: useInputCreationProps) {
  function generateLabel(id: string, key: string) {
    return (
      <Typography as="label" id={id}>
        {key}
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
            type={typeof inputsState[key] === 'boolean' ? InputTypes.checkbox : InputTypes.text}
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
