import { Navigate, Outlet, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoomsPage from './pages/RoomsPage';
import BookingPage from './pages/BookingsPage';
import UserPage from './pages/UsersPage';
import ContactPage from './pages/ContactPage';
import { useEffect, useState } from 'react';
import MainPage from './pages/MainPage';

const PrivateRoute = ({ auth, redirect = "/login", children }) => {
  if (!auth) {
    return <Navigate to={redirect} replace />
  }

  return children ? children : <Outlet />;
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
          <Route path='bookings' element={<BookingPage />} />
          <Route path='users' element={<UserPage />} />
          <Route path='contact' element={<ContactPage />} />
        </Route>
      </Route>
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
