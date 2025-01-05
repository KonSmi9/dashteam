import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import './shared/styless/global.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

if (!container) {
  throw new Error('Контейнер root не найден');
}

root.render(<App />);
