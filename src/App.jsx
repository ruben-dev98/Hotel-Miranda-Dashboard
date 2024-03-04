import { Navigate, Outlet, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoomsPage from './pages/RoomsPage';
import BookingPage from './pages/BookingsPage';
import UserPage from './pages/UsersPage';
import ContactPage from './pages/ContactPage';
import { useState } from 'react';
import MainPage from './pages/MainPage';

const PrivateRoute = ({ auth, redirect = "/login", children }) => {
  if (!auth) {
    return <Navigate to={redirect} replace />
  }

  return children ? children : <Outlet />;
}

function App() {
  const [auth, setAuth] = useState(false);
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage auth={auth} setAuth={setAuth} />} />
      <Route element={<PrivateRoute auth={auth}/>}>
        <Route path="/" element={<MainPage setAuth={setAuth}/>}>
          <Route index element={<DashboardPage />} />
          <Route path='rooms' element={<RoomsPage />} />
          <Route path='bookings' element={<BookingPage />} />
          <Route path='users' element={<UserPage />} />
          <Route path='contact' element={<ContactPage />} />
        </Route>
      </Route>
    </>
  ));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
