import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoomsPage from './pages/Room/RoomsPage';
import BookingsPage from './pages/Booking/BookingsPage';
import UsersPage from './pages/User/UsersPage';
import ContactPage from './pages/ContactPage';
import { useContext } from 'react';
import MainPage from './pages/MainPage';
import PropTypes from 'prop-types';
import UserPage from './pages/User/UserPage';
import BookingPage from './pages/Booking/BookingPage';
import RoomPage from './pages/Room/RoomPage';
import { UserAuthProvider, UserContext } from './context/UserContext';
import BookingFormPage from './pages/Booking/BookingFormPage';
import UserFormPage from './pages/User/UserFormPage';
import RoomFormPage from './pages/Room/RoomFormPage';


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
        <Route path='rooms/room' element={<RoomFormPage />} />
        <Route path='rooms/:id' element={<RoomPage />} />
        <Route path='rooms/edit/:id' element={<RoomFormPage /> }/>
        <Route path='bookings' element={<BookingsPage />} />
        <Route path='bookings/booking' element={<BookingFormPage />} />
        <Route path='bookings/:id' element={<BookingPage />} />
        <Route path='bookings/edit/:id' element={<BookingFormPage /> }/>
        <Route path='users' element={<UsersPage />} />
        <Route path="users/user" element={<UserFormPage />} />
        <Route path="users/:id" element={<UserPage />} />
        <Route path="users/edit/:id" element={<UserFormPage />} />
        <Route path='contact' element={<ContactPage />} />
      </Route>
    </Route>
  </>
));

function App() {

  return (
    <>
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
    </>
  );
}

export default App;
