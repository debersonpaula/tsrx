import React from 'react';
import Config from './Config';

export default function ConfigApp() {
  return (
    <div>
      <h4>Testing configuration</h4>
      <p data-testid="config-number">ParamNumber = {Config.ParamNumber}</p>
      <p data-testid="config-text">ParamText = {Config.ParamText}</p>
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
    </div>
  );
}
