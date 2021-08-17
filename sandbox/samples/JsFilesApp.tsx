import React from 'react';

import SampleFile from './SampleFile';
const SampleModule = require('./SampleModule.mjs');

export default function JsFilesApp() {
  return (
    <div>
      <h4>Testing js/mjs imports</h4>

      <p>Sample JS file import = {SampleFile()}</p>
      <p>Sample JS file import = {SampleModule.Exec()}</p>
    </div>
  );
}
