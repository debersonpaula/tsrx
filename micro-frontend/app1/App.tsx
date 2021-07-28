import React from 'react';

const App = ({ label }: { label?: string }) => {
  return (
    <div
      style={{
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: 'cyan',
      }}
    >
      <h1>App 1</h1>
      {label && <p>{label}</p>}
    </div>
  );
};

export default App;
