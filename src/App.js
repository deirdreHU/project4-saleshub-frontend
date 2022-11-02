import { Routes, Route, Navigate } from 'react-router-dom';
import {ProtectedRoute} from "./auth/protected.route";
import Home from "./pages/home/Index";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Contacts from "./pages/home/modules/contacts";
import ContactDetail from "./pages/contact-detail";
import {Deals} from "./pages/home/modules/deals";
import {DealDetail} from "./pages/deal-detail";

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
        <Route path={'deals/list'} element={<Deals />}/>
        <Route path={'deals/:deal_id'} element={<DealDetail />}/>
        <Route path={'contacts/:contact_id'} element={<ContactDetail />} />
      
      </Route>

      <Route path={'login'} element={<Login />} />

      <Route path={'register'} element={<Register />} />
      
    </Routes>
  );
}

export default App;

