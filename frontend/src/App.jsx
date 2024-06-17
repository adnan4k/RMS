
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import VisitorRequest from './pages/visitorRequest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout/Layout';
import ForgetPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import StepperForm from './owner/CreateHouses';
import UpgradeToOwner from './pages/UpgradeToOwner';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import EditOwner from './pages/EditOwner';
import { Houses } from './owner/Houses';
import { SingleHouse } from './owner/House';
import Showmore from './pages/Showmore';
import DetailsHouses from './pages/DetailsHouses';
import CreateTenants from './owner/CreateTenants';
import ShowTenant from './tenant/ShowTenant';
import { EditHouse } from './owner/EditHouse';
import { EditImages } from './owner/EditImages';
import { EditHouseAddress } from './owner/EditAddress';
import { EditBankAccounts } from './owner/EditBankAccount';
import { TenantProfile } from './pages/TenantProfile';
import { Maintenance } from './tenant/Maintenance';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo } from 'react';
import { OwnerMaintenance } from './owner/Maintenance';
import Tenant from './owner/Tenant';
import PaymentOptions from './pages/payment/PaymentOptions';
// import { UserProvider } from './context/UserContext';


// The default 404 should be done for the route
function App() {
  const queryClient = new QueryClient();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
        createTheme({
            palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );

  return (
    <>

      <ToastContainer />
      {/* <UserProvider > */}
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
          

            <Route path="/login" element={<Login />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/request" element={<VisitorRequest />} />

            <Route path='/owner/' element={<ProtectedRoutes role='owner' />}>
              <Route index element={<Houses />} />
              <Route path="create-house" element={<StepperForm />} />
              <Route path="show-tenant" element={<ShowTenant />} />

              <Route path='edit' element={<EditOwner />} />
              <Route path='maintenance' element={<OwnerMaintenance />} />
              <Route path=':houseid' element={<SingleHouse />} />
              <Route path=':houseid/create-tenants' element={<CreateTenants />} />
              <Route path=':houseid/edit/general' element={<EditHouse />} />
              <Route path=':houseid/edit/images' element={<EditImages />} />
              <Route path=':houseid/edit/address' element={<EditHouseAddress />} />
              <Route path=':houseid/edit/bank' element={<EditBankAccounts />} />
              <Route path='tenant/:tenantid' element={<Tenant />} />
            </Route>

            
            <Route path="/" element={<Layout />}>
                {/* payment routes */}
            <Route path="/payment-options" element={<PaymentOptions />} />

              <Route index element={<Home />} />
              <Route path="/showmore" element={<Showmore />} />
              <Route path="/details" element={<DetailsHouses />} />

              <Route path='profile/' element={<ProtectedRoutes />}>
                <Route index element={<Profile />} />
                <Route path='edit' element={<EditProfile />} />
                <Route path='upgrade' element={<UpgradeToOwner />} />
              </Route>

              <Route path='tenant/' element={<ProtectedRoutes role='tenant'/>}>
                <Route index element={<TenantProfile />}/>
                <Route path='edit' element={<CreateTenants edit={true} />}/>
                <Route path='maintenance' element={<Maintenance />}/>
                {/* <Route path='edit' element={<CreateTenants edit={true} />}/> */}
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      </ThemeProvider>
      {/* </UserProvider> */}
    </>
  );
}

export default App;
