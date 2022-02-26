import { BrowserRouter } from 'react-router-dom'

import { Routes } from './routes/routes';

import { AuthContextProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes />
        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
