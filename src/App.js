import { Routes, Route, Navigate } from 'react-router-dom';
import {ProtectedRoute} from "./auth/protected.route";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Contacts from "./pages/contacts/Contacts";

function App() {
  return (
    <Routes>

      <Route path={''} element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }>

        <Route path={''} index element={<Home />} />

        <Route path={'contacts'} element={<Contacts />}/>

      </Route>

      <Route path={'login'} element={<Login />} />

      <Route path={'register'} element={<Register />} />
      
    </Routes>
  );
}

export default App;

