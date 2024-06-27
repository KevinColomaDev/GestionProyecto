import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from '../menu/menu';
import '../App.css';
import { Link } from "react-router-dom";

function CrearUsuario(){

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [cargo, setCargo] = useState('');

    const add = () => {
        axios.post("http://10.157.152.50:3001/crearusuario",{
            nombreUsuario: nombreUsuario,
            cargo: cargo
        }).then(()=>{
            Swal.fire({
                title: "<strong>Registro exitoso!!</strong>",
                html: "<i>El usuario<strong>" + nombreUsuario + " </strong>fue registrado con éxito</i>",
                icon: 'success',
                timer: 1000
            })
        })
    }



return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="App flex-grow-1"> {/* Utiliza flex-grow-1 para que ocupe el espacio restante */}
        <div className="card text-center">

          <div className="card-header">
            Usuarios
          </div>

          <div className="card-body">
            
            <form onSubmit={add}>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Usuario:</span>
                    <input type="text"
                        onChange={(event) => { setNombreUsuario(event.target.value); }}
                        className="form-control" value={nombreUsuario} placeholder="Ingrese nombre del usuario" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Cargo:</span>
                    <input type="text"
                        onChange={(event) => { setCargo(event.target.value); }}
                        className="form-control" value={cargo} placeholder="Ingrese cargo del usuario" aria-describedby="basic-addon1" />
                </div>

                <button type="submit" className="btn btn-primary">Crear Usuario</button>
                
            </form>


          </div>

          
        </div>
          
        </div>
    </div>
)
}

export default CrearUsuario;