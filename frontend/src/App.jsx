
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';



function App() {
  return (
    <div>
 <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
       
      </Routes>
    </BrowserRouter>    </div>
  );
}

export default App;
