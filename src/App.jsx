import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoomsPage from './pages/RoomsPage';
import BookingsPage from './pages/BookingsPage';
import UsersPage from './pages/UsersPage';
import ContactPage from './pages/ContactPage';
import { useContext, useEffect } from 'react';
import MainPage from './pages/MainPage';
import PropTypes from 'prop-types';
import UserPage from './pages/UserPage';
import BookingPage from './pages/BookingPage';
import RoomPage from './pages/RoomPage';
import { UserAuthProvider, UserContext } from './app/UserContext';


const PrivateRoute = ({redirect = "/login", children }) => {
  const context = useContext(UserContext);
  return !context.state.auth ?
    <Navigate to={redirect} replace />
    :
    children ? children : <Outlet />;
}

PrivateRoute.propTypes = {
  auth: PropTypes.bool,
  redirect: PropTypes.string,
  children: PropTypes.node
}

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<PrivateRoute />}>
      <Route path="/" element={<MainPage />}>
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
  </>
));

function App() {
  const context = useContext(UserContext);
  const isAuth = localStorage.getItem('auth') ? (localStorage.getItem('auth') === "1" ? true : false) : false;
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {user: '', password: ''};


  useEffect(() => {
    localStorage.setItem('auth', context.state.auth ? '1' : '0');
    localStorage.setItem('user', JSON.stringify({user: context.state.user, password: context.state.password}));
  }, [context]);

  return (
    <>
    <UserAuthProvider value={{state: context.state, dispatch: context.dispatch}}>
      <RouterProvider router={router} />
    </UserAuthProvider>
    </>
  );
}

export default App;
