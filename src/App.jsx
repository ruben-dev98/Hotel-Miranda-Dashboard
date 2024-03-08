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
  return !auth ?
    <Navigate to={redirect} replace />
    :
    children ? children : <Outlet />;
}

PrivateRoute.propTypes = {
  auth: PropTypes.bool,
  redirect: PropTypes.string,
  children: PropTypes.node
}

const router = (auth, setAuth) => createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/login" element={<LoginPage auth={auth} setAuth={setAuth} />} />
    <Route element={<PrivateRoute auth={auth} />}>
      <Route path="/" element={<MainPage setAuth={setAuth} />}>
        <Route index element={<DashboardPage />} />
        <Route path='rooms' element={<RoomsPage />} />
        <Route path='rooms/room' element={<RoomPage />} />
        <Route path='rooms/:id' element={<RoomPage />} />
        <Route path='rooms/edit/:id' element={<RoomPage /> }/>
        <Route path='bookings' element={<BookingsPage />} />
        <Route path='bookings/booking' element={<BookingPage />} />
        <Route path='bookings/:id' element={<BookingPage />} />
        <Route path='users' element={<UsersPage />} />
        <Route path="users/user" element={<UserPage />} />
        <Route path="users/:id" element={<UserPage />} />
        <Route path="users/edit/:id" element={<UserPage />} />
        <Route path='contact' element={<ContactPage />} />
      </Route>
    </Route>
    <Route path='/*' element={<Navigate to='/login' replace />}></Route>
  </>
));

function App() {
  const isAuth = localStorage.getItem('auth') ? (localStorage.getItem('auth') === "1" ? true : false) : false;
  const [auth, setAuth] = useState(isAuth);

  useEffect(() => {
    localStorage.setItem('auth', auth ? '1' : '0');
  }, [auth]);

  return (
    <>
      <RouterProvider router={router(auth, setAuth)} />
    </>
  );
}

export default App;
