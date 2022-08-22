export enum BoardPropertiesEnum {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
  MARK = 'mark',
  DELETEMARKED = 'deleteMarked',
}

export type SingleChangeActionTypes =
  | BoardPropertiesEnum.ADD
  | BoardPropertiesEnum.UPDATE
  | BoardPropertiesEnum.DELETE;
