import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './config/config'
import SimpleReactLightbox from 'simple-react-lightbox'
import App from './App.jsx';

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
    
      <App />
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById('root')
);

