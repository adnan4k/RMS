
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';



function App() {
  return (
    <div>
 <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
       
      </Routes>
    </BrowserRouter>    </div>
  );
}

export default App;
