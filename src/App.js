import './App.css';
import Login from './pages/login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Lista from './pages/lista_pagos';
import Añadir_Pagos from './pages/añadir_pago';
import Servicios from './pages/servicios_admin';
import swal from 'sweetalert2';
window.Swal = swal;

function App() {

    const roles= {
        "aljes@gmail.com" : "admin",
        "probando@gmail.com": "user",
        "testuser@gmail.com": "user"
    }

    let email = JSON.parse(localStorage.getItem("email")) ?? [];
    const role=roles[email]

    const  AdminRoute = () => {
        const [manager, setmaneger] = useState(role==="manager"?true:null);
    
        return manager ? <Outlet /> : <Navigate to="/" />;
    }
    






  return (
  
    <BrowserRouter>
            <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/lista" className="btn btn-outline-light me-2">Pagos</Link></li>
                        <li><Link to="/pagos" className="btn btn-outline-light me-2">Añadir Nuevos Pagos</Link></li>
                        <li><Link to="/servicios" className="btn btn-outline-light me-2">Servicios Admin</Link></li>
                    </ul>

                    <div className="text-end">
                        <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                    </div>
                </div>
            </div>
        </header>
     <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/lista" element={<Lista/>}></Route>
      <Route path="/pagos" element={<Añadir_Pagos/>}></Route>
      <Route path="/servicios" element={<Servicios/>}></Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
