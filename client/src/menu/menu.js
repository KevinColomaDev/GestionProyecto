import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {

  return (
    <div className="menu">
  <ul>
    
    <li><Link to='/'><img width="30" height="30" src='' /><br />Usuarios</Link></li>
    <li><Link to='/PerfilCT'><img width='30' height='30' src= '' /><br />Perfil Comision Tecnica</Link></li>
    <li><Link to='/Perfil'><img width='30' height='30' src= '' /><br />Perfil </Link></li>
    <li><Link to='/Proyecto'><img width='30' height='30' src= '' /><br />Proyecto </Link></li>
  </ul>
</div>
    
  );
}

export default Sidebar;