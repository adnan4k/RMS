
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import CreateHouse from './owner/CreateHouses';
import VisitorRequest from './pages/visitorRequest';


function App() {
  return (
    <div>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-house" element={<CreateHouse />} />
          <Route path="/request" element={<VisitorRequest />} />




        </Routes>
      </BrowserRouter>    </div>
  );
}

export default App;
