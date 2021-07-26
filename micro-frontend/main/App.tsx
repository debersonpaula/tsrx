import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <RemoteComponent
        name="app1"
        entry="./App"
        url="http://localhost:5000/app1/remoteEntry.js"
      />
      <RemoteComponent
        name="app2"
        entry="./App"
        url="http://localhost:5000/app2/remoteEntry.js"
      />
    </div>
  );
};

function RemoteComponent({
  name,
  entry,
  url,
}: {
  name: string;
  entry: string;
  url: string;
}) {
  const divEl = React.useRef(null);
  React.useEffect(() => {
    load(url)
      .then(async () => {
        const container = window[name];
        const factoryFn = await container.get(entry);
        const module = factoryFn();
        const el = divEl.current;
        ReactDOM.render(module.default(), el);
      })
      .catch((err) => {
        console.error('RemoteComponent load error', err);
      });
  }, []);
  return <div id={name} ref={divEl}></div>;
}

function load(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(url)) {
      resolve(null);
    } else {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      script.id = url;
      document.head.appendChild(script);
    }
  });
}

export default App;
