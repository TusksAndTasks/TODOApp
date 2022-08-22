import { IAssignment } from '../types/interfaces';
import { apiController } from './api';

export async function markRequest(assignments: IAssignment[]) {
  const markElems = assignments.filter((assignment) => !assignment.done);
  const response = await Promise.all(
    markElems.map((assignment) => apiController.updateAssignment(assignment))
  );

  return !response.find((res) => res === undefined);
}

export async function deleteMarkedRequest(assignments: IAssignment[]) {
  const markElems = assignments.filter((assignment) => assignment.done);
  const response = await Promise.all(
    markElems.map((assignment) => apiController.deleteAssignment(assignment.id))
  );

  return !response.find((res) => res === undefined);
}
