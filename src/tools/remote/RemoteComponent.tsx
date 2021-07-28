import React from 'react';

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
  const component = useRemoteComponent(url, entry, name);
  return <div id={name}>{component && component(props)}</div>;
}

function useRemoteComponent(url: string, entry: string, name: string) {
  const [component, setComponent] =
    React.useState<React.FunctionComponent>(null);

  React.useEffect(() => {
    load(url)
      .then(async () => {
        await __webpack_init_sharing__('default');

        const container = window[name];
        await container.init(__webpack_share_scopes__.default);

        const factoryFn = await container.get(entry);
        const module = factoryFn();
        setComponent(module.default);
      })
      .catch((err) => {
        console.error('RemoteComponent load error', err);
      });
  }, []);

  return component;
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
