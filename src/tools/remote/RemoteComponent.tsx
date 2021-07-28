import React from 'react';
import ReactDOM from 'react-dom';

export function RemoteComponent({
  name,
  entry = './App',
  url,
  props,
}: {
  /**
   * Name of remote application
   */
  name: string;
  /**
   * Entry module name.
   * Default: './App'
   */
  entry?: string;
  /**
   * Location of the remoteEntry.js file
   */
  url: string;
  /**
   * Additional props
   */
  props?: any;
}) {
  const divEl = React.useRef(null);
  React.useEffect(() => {
    load(url)
      .then(async () => {
        const container = window[name];
        const factoryFn = await container.get(entry);
        const module = factoryFn();
        const el = divEl.current;
        ReactDOM.render(module.default(props), el);
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
