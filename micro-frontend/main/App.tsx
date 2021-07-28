import React from 'react';
import { RemoteComponent } from 'tsrx/tools';

const App = () => {
  return (
    <div>
      <RemoteComponent
        name="app1"
        url="http://localhost:5000/app1/remoteEntry.js"
        props={{
          label: 'info from main app',
        }}
      />
      <RemoteComponent
        name="app2"
        url="http://localhost:5000/app2/remoteEntry.js"
      />
    </div>
  );
};

export default App;
