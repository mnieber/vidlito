import { QueryClientProvider } from '@tanstack/react-query';
import { toJS } from 'mobx';
import { applyFormatters } from 'mobx-log';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { setOptions } from 'skandha';
import { queryClient } from 'src/api/queryClient';
import { App } from 'src/app/components';
import { flags } from 'src/app/flags';
import 'src/frames/styles/index.scss';
import { RoutesProvider } from 'src/routes/components/RoutesProvider';

const strict = false;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (process.env.NODE_ENV === 'development') {
  applyFormatters();
}

const body = (
  <QueryClientProvider client={queryClient}>
    <RoutesProvider>
      <App />
    </RoutesProvider>
  </QueryClientProvider>
);

root.render(strict ? <React.StrictMode>{body}</React.StrictMode> : body);

setOptions({
  logging: flags.logSkandha,
  formatObject: toJS,
});
