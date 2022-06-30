import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

import Routers from './routes'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000}/>
      <Routers/>
    </BrowserRouter>
  );
}
export default App;
