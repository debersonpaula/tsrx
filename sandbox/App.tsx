import * as React from 'react';
import './style.css';
import Config from './Config';

import { EnumCheck } from './EnumCheck';
import ReactLogoIcon from './assets/react-logo.svg';

import Image from './assets/image.jpg';

const SampleModule = require('./SampleModule.mjs');
const SampleFile = require('./SampleFile.js');

const decorator = (): ClassDecorator => {
  return (target) => {
    target.prototype.method = () => 'From Decorator';
  };
};

@decorator()
export class App extends React.Component {
  render() {
    const check = EnumCheck.TypeA;
    return (
      <div>
        <h2>React App</h2>
        <p>Testing TSReact</p>
        <hr />
        <h3>Styled H3</h3>
        <hr />
        <h4>Environment Variables</h4>
        <p>ParamNumber = {Config.ParamNumber}</p>
        <p>ParamText = {Config.ParamText}</p>
        <p>ParamAny = {Config.ParamAny}</p>
        <p>ParamBoolean1 = {Config.ParamBoolean1 ? 'true' : 'false'}</p>
        <p>ParamBoolean2 = {Config.ParamBoolean2 ? 'true' : 'false'}</p>
        <p>ParamObject: </p>
        <ul>
          <li>ParamObject.label = {Config.ParamObject.label}</li>
          <li>ParamObject.value = {Config.ParamObject.value}</li>
        </ul>
        <p>Methods are not imported from env:</p>
        <ul>
          <li>ParamMethod() = {Config.ParamMethod()}</li>
          <li>ParamMethodArrow() = {Config.ParamMethodArrow()}</li>
        </ul>
        <p>Enum Check = {check === EnumCheck.TypeA ? 1 : 2}</p>
        <p>Sample JS file import = {SampleFile()}</p>
        <p>Sample JS file import = {SampleModule.Exec()}</p>

        <hr />

        <div>Testing decorator = {this.method()}</div>

        <hr />

        <div>
          Logo SVG <ReactLogoIcon />
        </div>

        <hr />

        <div>
          <img src={Image} />
        </div>
      </div>
    );
  }

  method() {
    return 'From Component';
  }
}
