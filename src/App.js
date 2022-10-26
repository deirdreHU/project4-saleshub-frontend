import { Routes, Route, Navigate } from 'react-router-dom';
import {ProtectedRoute} from "./auth/protected.route";
import Home from "./pages/contacts/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Contacts from "./pages/contacts/Contacts";
import CreateContact from './pages/contacts/modules/createContact/CreateContact';
import ContactDetail from "./pages/contact-detail/index";

function App() {
  return (
    <Routes>

      <Route path={''} element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }>

        <Route path={''} index element={<Navigate to={'contacts'} />} />
        <Route path={'contacts'} element={<Contacts />}/>
        <Route path={'contacts/create'} element={<CreateContact />}/>
        <Route path={'contacts/:contact_id'} element={<ContactDetail />} />
        

      </Route>

      <Route path={'login'} element={<Login />} />

      <Route path={'register'} element={<Register />} />
      
    </Routes>
  );
}

export default App;

