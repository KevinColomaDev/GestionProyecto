import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import user from "../img/user-interface.png"
import comision from "../img/red.png"
import perfil from "../img/gestion-de-equipos.png"
import proyecto from "../img/proyecto.png"
import dashboard from "../img/datos.png"
import gestion from "../img/administrar.png"

function Sidebar() {

  return (
    <div className="menu">
  <ul>
    
    <li><Link to='/'><img width="30" height="30" src={user} /><br />Administración</Link></li>
    <li><Link to='/Gestion'><img width='30' height='30' src= {gestion} /><br />Gestión </Link></li>
    <li><Link to='/Dashboard'><img width='30' height='30' src= {dashboard} /><br />Dashboard </Link></li>
  </ul>
</div>
    
  );
}

export default Sidebar;