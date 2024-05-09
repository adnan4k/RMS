
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Sidebar from './layout/Sidebar';
import CreateHouse from './owner/CreateHouse';



function App() {
  return (
    <div>
 <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-house" element={<CreateHouse />} />


       
      </Routes>
    </BrowserRouter>    </div>
  );
}

export default App;
