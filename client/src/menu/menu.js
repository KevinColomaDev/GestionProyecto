import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import user from "../img/user-interface.png"
import comision from "../img/red.png"
import perfil from "../img/gestion-de-equipos.png"
import proyecto from "../img/proyecto.png"

function Sidebar() {

  return (
    <div className="menu">
  <ul>
    
    <li><Link to='/'><img width="30" height="30" src={user} /><br />Usuarios</Link></li>
    <li><Link to='/PerfilCT'><img width='30' height='30' src= {comision} /><br />Perfil Comision Tecnica</Link></li>
    <li><Link to='/Perfil'><img width='30' height='30' src= {perfil} /><br />Perfil </Link></li>
    <li><Link to='/Proyecto'><img width='30' height='30' src= {proyecto} /><br />Proyecto </Link></li>
  </ul>
</div>
    
  );
}

export default Sidebar;