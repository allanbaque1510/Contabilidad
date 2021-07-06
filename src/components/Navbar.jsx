import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg  bg-dark">
                <div className="dropdo">
                    <Link className="nav-link dropdown-toggle refer" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fab fa-contao"></i>
                        Contabilidad
                    </Link>
                        <ul className="dropdown-menu dm" aria-labelledby="navbarDropdownMenuLink">
                            <li><Link className="dropdown-item dm" to="/">DashBoard </Link></li>
                            <li><Link className="dropdown-item dm" to="/clientes">Clientes</Link></li>
                            <li><Link className="dropdown-item dm" to="/registrar">Registrar </Link></li>
                            <li><Link className="dropdown-item dm" to="/modificar">Modificar</Link></li>
                            <li><Link className="dropdown-item dm" to="/historial">Historial</Link></li>
                        </ul>
                    </div>
                <div class="container-fluid nabfr">
                    <Link class="navbar-brand das" to='/'>
                        <i class="fab fa-contao"></i>
                        Contabilidad
                    </Link>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link class="nav-link bt" to='/'>DashBoard</Link>
                        <Link class="nav-link bt" to='/clientes'>Clientes</Link>
                        <Link class="nav-link bt" to='/registrar'>Registrar</Link>
                        <Link class="nav-link bt" to='/modificar'>Modificar</Link>
                        <Link class="nav-link bt" to='/historial'>Historial</Link>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
