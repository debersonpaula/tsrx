import React from 'react';

class ClassModel {
  text = 'This is class model property';
}

export default function ClassTypeApp() {
  const x = new ClassModel();
  return (
    <div>
      <h4>Testing Class Types</h4>
      <p>Content = {x.text}</p>
      <p>Name = {ClassModel.name}</p>
    </div>
  );
}
