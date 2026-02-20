import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);