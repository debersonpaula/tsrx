import React from 'react';
import ClassTypeApp from './ClassTypeApp';

const App = (props: { label?: string }) => {
  const [count, setCount] = React.useState(0);
  const label = props?.label;

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
      <p>Count = {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Del
      </button>
      {label && <p>{label}</p>}

      <hr />
      <ClassTypeApp />
    </div>
  );
};

export default App;
