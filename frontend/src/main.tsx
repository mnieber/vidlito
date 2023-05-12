// Import styles. This needs to be done before importing any components.
import '/src/frames/styles/index.scss';

import { action, toJS } from 'mobx';
import { applyFormatters } from 'mobx-log';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { setOptions } from 'skandha';
import { App } from '/src/app/components';
import { flags } from '/src/app/flags';

const strict = false;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (import.meta.env.DEV) {
  applyFormatters();
}

const body = <App />;

root.render(strict ? <React.StrictMode>{body}</React.StrictMode> : body);

setOptions({
  logging: flags.logSkandha,
  formatObject: toJS,
  decorateCb: action,
});
