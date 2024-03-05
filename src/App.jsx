import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoomsPage from './pages/RoomsPage';
import BookingsPage from './pages/BookingsPage';
import UsersPage from './pages/UsersPage';
import ContactPage from './pages/ContactPage';
import { useEffect, useState } from 'react';
import MainPage from './pages/MainPage';
import PropTypes from 'prop-types';
import UserPage from './pages/UserPage';
import BookingPage from './pages/BookingPage';
import RoomPage from './pages/RoomPage';


const PrivateRoute = ({ auth, redirect = "/login", children }) => {
  if (!auth) {
    return <Navigate to={redirect} replace />
  }

  return children ? children : <Outlet />;
}

PrivateRoute.propTypes = {
  auth: PropTypes.bool,
  redirect: PropTypes.string,
  children: PropTypes.node
}

function App() {
  const isAuth = localStorage.getItem('auth') ? (localStorage.getItem('auth') === "1" ? true : false) : false;
  const [auth, setAuth] = useState(isAuth);

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage auth={auth} setAuth={setAuth} />} />
      <Route element={<PrivateRoute auth={auth} />}>
        <Route path="/" element={<MainPage setAuth={setAuth} />}>
          <Route index element={<DashboardPage />} />
          <Route path='rooms' element={<RoomsPage />}></Route>
          <Route path='room' element={<RoomPage />}></Route>
          <Route path='bookings' element={<BookingsPage />} />
          <Route path='booking/:id' element={<BookingPage />} />
          <Route path='users' element={<UsersPage />} />
          <Route path="user" element={<UserPage />}/>
          <Route path='contact' element={<ContactPage />} />
        </Route>
      </Route>
      <Route path='/*' element={<Navigate to='/login' replace/>}></Route>
    </>
  ));
  
  useEffect(() => {
    localStorage.setItem('auth', auth ? '1' : '0');
  }, [auth]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
