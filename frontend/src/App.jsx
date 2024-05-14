
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateHouse from './owner/CreateHouse';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query' 


function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-house" element={<CreateHouse />} />
          </Routes>
        </BrowserRouter>    
      </QueryClientProvider>
    </>
  );
}

export default App;
