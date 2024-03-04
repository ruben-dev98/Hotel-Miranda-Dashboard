import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoomsPage from './pages/RoomsPage';
import BookingPage from './pages/BookingsPage';
import UserPage from './pages/UsersPage';
import ContactPage from './pages/ContactPage';
import { useState } from 'react';



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<LoginPage/>}>
      <Route index element={<DashboardPage />} />
      <Route path='/rooms' element={<RoomsPage />} />
      <Route path='/bookings' element={<BookingPage />} />
      <Route path='/users' element={<UserPage />} />
      <Route path='/contact' element={<ContactPage />} />
  </Route>
));



function App() {
    const [auth, setAuth] = useState(false);
    
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
