import { useLocation } from 'react-router-dom';
import { ILocation } from '../types/interfaces';
import {
  AssignmentDescription,
  AssignmentTitle,
  FullAssignment,
  StyledFullImage,
} from '../styledComponents/styledComponents';

export default function AssignmentPage() {
  const location = useLocation();

  const { title, description, done, file, author } = (location as ILocation).state;
  const status = done ? 'done' : 'undone';

  return (
    <FullAssignment>
      <AssignmentTitle status={status}>{`${title}`}</AssignmentTitle>
      <AssignmentDescription status={status}>{`${description}`}</AssignmentDescription>
      <p>{`Status: ${status}`}</p>
      <p>{`Author: ${author}`}</p>
      {file ? <StyledFullImage src={file} alt="custom pic" /> : <p>No picture for this task</p>}
    </FullAssignment>
  );
}
