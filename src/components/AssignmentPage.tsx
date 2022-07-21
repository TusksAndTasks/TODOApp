import { useLocation } from 'react-router-dom';
import { ILocation } from '../types/interfaces';

export default function AssignmentPage() {
  const location = useLocation();

  const { state } = location as ILocation;

  return <div>{`${state.title}`}</div>;
}
