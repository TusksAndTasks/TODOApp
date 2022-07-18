import React, { useState } from 'react';
import { IRouterProps } from '../types/interfaces';
import Form from '../components/Form';

export default function FormRouter({ assigment, onClick, children }: IRouterProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleForm() {
    setIsOpen(!isOpen);
  }

  return isOpen ? (
    <div className="form-container">
      <button onClick={() => toggleForm()}>Close</button>
      <Form onSubmit={onClick} assignment={assigment} toggleForm={toggleForm} />
    </div>
  ) : (
    <div className="form-data-container">
      {children}
      <button onClick={() => toggleForm()}>{children ? 'Refactor task' : 'Create task'}</button>
    </div>
  );
}
