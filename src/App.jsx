import { Navigate, Outlet, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoomsPage from './pages/RoomsPage';
import BookingPage from './pages/BookingsPage';
import UserPage from './pages/UsersPage';
import ContactPage from './pages/ContactPage';
import { useEffect, useState } from 'react';
import MainPage from './pages/MainPage';
import styled from 'styled-components';

const WindowStyled = styled.div`
width: 100%;
height: 100vh;
display: grid;
grid-template-columns: 15% 85%;
grid-template-rows: 10% 90%;
grid-template-areas: 
  'sidebar header'
  'sidebar content'
;
`;

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
      <Route path='/*' element={<Navigate to='/login' replace/>}></Route>
    </>
  ));
  
  useEffect(() => {
    localStorage.setItem('auth', auth ? '1' : '0');
  }, [auth]);

  return (
    <WindowStyled>
      <RouterProvider router={router} />
    </WindowStyled>
  );
}

export default App;
