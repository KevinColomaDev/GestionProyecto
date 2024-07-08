import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from '../menu/menu';
import '../App.css';
import { Link } from "react-router-dom";

function Proyecto(){

    const [nombreProyecto, setnombreProyecto] = useState('');
    const [complejidad, setComplejidad] = useState('');

    const add = (event) => {
        event.preventDefault()
        if(nombreProyecto == '' | complejidad == ''){
            Swal.fire({
                title: "<strong>Ingrese todos los campos!!</strong>",
                icon: 'error',
                timer: 1000
            });
        }else{
            axios.post("http://10.157.152.50:3001/crearproyecto",{
                nombreProyecto: nombreProyecto,
                complejidad:complejidad
            }).then(()=>{
                limpiarDatos();
                Swal.fire({
                    title: "<strong>Registro exitoso!!</strong>",
                    html: "<i>El perfil <strong>" + nombreProyecto + " </strong>fue registrado con éxito</i>",
                    icon: 'success',
                    timer: 1000
                })
            })
        }
        
    }

    const limpiarDatos=()=>{
        setnombreProyecto('');
        setComplejidad('');
    }

return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="App flex-grow-1"> {/* Utiliza flex-grow-1 para que ocupe el espacio restante */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav"> {/* Elimina me-auto mb-2 mb-lg-0 */}
                    <li className="nav-item">
                        <Link to="/" className="nav-link active">Usuarios</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/PerfilCT" className="nav-link active">Perfiles Comision Tecnica</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/Perfil' className='nav-link active'>Perfiles</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/Proyecto' className="nav-link active">Proyectos</Link>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="card text-center">

          <div className="card-header">
            Proyecto 
          </div>

          <div className="card-body">
            
            <form onSubmit={add}>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Proyecto:</span>
                    <input type="text"
                        onChange={(event) => { setnombreProyecto(event.target.value); }}
                        className="form-control" value={nombreProyecto} placeholder="Ingrese nombre del proyecto" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Complejidad:</span>
                    <select className='form-select' value={complejidad} onChange={(e)=> setComplejidad(e.target.value)} >
                        <option value="">Seleccionar la complejidad</option>
                        <option value="1">Baja</option>
                        <option value="2">Media</option>
                        <option value="3">Alta</option>
                    </select>
                     
                </div>

                <button type="submit" className="btn btn-primary">Crear Proyecto</button>

            </form>


          </div>

          
        </div>
          
        </div>
    </div>
)
}

export default Proyecto;