import { Button } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => {
  return <Button type="primary">Нажми меня</Button>;
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('Контейнер root не найден');
}

const root = ReactDOM.createRoot(container);
root.render(<App />);
