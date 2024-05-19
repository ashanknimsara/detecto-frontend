import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import AccountSetting from './pages/Account-Setting/Genral';
import ProfileTab from './pages/Account-Setting/Genral/Profile-Tab';
import ChangePasswordTab from './pages/Account-Setting/Genral/change-password';
import Cases from './pages/Dashboard/Cases';
import MoreInformation from './pages/Dashboard/MoreInformation';
import SignIn from './pages/Authentication/SignIn';
import SingnUp from './pages/Authentication/SingnUp'

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Security Camera System | Detecto" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Detecto" />
              <Profile />
            </>
          }
        />
        <Route
          path="/profile/account-setting/general"
          element={
            <>
              <PageTitle title="Profile | Detecto" />
              <AccountSetting />
            </>
          }
        />
        <Route
          path="/profile/account-setting/general/general-info"
          element={
            <>
              <PageTitle title="Profile | Detectoe" />
              <ProfileTab />
            </>
          }
        />
        <Route
          path="/profile/account-setting/general/change-password"
          element={
            <>
              <PageTitle title="Profile | Detecto" />
              <ChangePasswordTab />
            </>
          }
        />

        <Route
          path="/Dashboard/security-camera"
          element={
            <>
              <PageTitle title="Dashboard | Detecto" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/Dashboard/Cases"
          element={
            <>
              <PageTitle title="Dashboard | Detecto" />
              <Cases/>
            </>
          }
        />
        <Route
          path="/Dashboard/SignIn"
          element={
            <>
              <PageTitle title="Dashboard | Detecto" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/Dashboard/SignUp"
          element={
            <>
              <PageTitle title="Dashboard | Detecto" />
              <SingnUp/>
            </>
          }
        />

        <Route
          path="/Dashboard/MoreInformation/:_id"
          element={
            <>
              <PageTitle title="Dashboard | Detecto" />
             <MoreInformation/>
            </>
          }
        />
      </Routes>
      
    </>
  );
}

export default App;
