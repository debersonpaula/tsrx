import * as React from 'react';

import ConfigApp from './samples/ConfigApp';
import EnumApp from './samples/EnumApp';

import JsFilesApp from './samples/JsFilesApp';

import StyledApp from './samples/StyledApp';
import { DecoratorApp } from './samples/DecoratorApp';
import SvgApp from './samples/SvgApp';
import ImageApp from './samples/ImageApp';

export class App extends React.Component {
  render() {
    return (
      <div>
        <h2>React App</h2>
        <p>Testing TSReact</p>
        <hr />
        <ConfigApp />
        <hr />
        <StyledApp />
        <hr />
        <JsFilesApp />
        <hr />
        <EnumApp />
        <hr />
        <DecoratorApp />
        <hr />
        <SvgApp />
        <hr />
        <ImageApp />
      </div>
    );
  }
}
