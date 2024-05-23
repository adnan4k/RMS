
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import VisitorRequest from './pages/visitorRequest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './layout/Layout';
import ForgetPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import StepperForm from './owner/CreateHouses';
import UpgradeToOwner from './pages/UpgradeToOwner';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import EditOwner from './pages/EditOwner';
// import { GoogleMap } from './components/GoogleMap';
import { AddBankAccounts } from './components/AddBankAccounts';
import MapComponent from './components/Map';

// The default 404 should be done for the route
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
            <Route path="/forget" element={<ForgetPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/request" element={<VisitorRequest />} />
            {/* <Route path="/map" element={<MapComponent />}/> */}

            <Route path='/owner/' element={<ProtectedRoutes role='owner'/>}>
              <Route path="create-house" element={<StepperForm />} />
              <Route path="bankaccounts" element={<AddBankAccounts />}/>
              <Route path='edit' element={<EditOwner/>}/>
            </Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='profile/' element={<ProtectedRoutes />}>
                <Route index element={<Profile />} />
                <Route path='edit' element={<EditProfile />} />
                <Route path='upgrade' element={<UpgradeToOwner />} />
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
