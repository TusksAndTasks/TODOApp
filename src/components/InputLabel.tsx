import React from 'react';

export default function InputLabel({ id, name }: { id: string; name: string }) {
  return <label htmlFor={id}>{name}</label>;
}
