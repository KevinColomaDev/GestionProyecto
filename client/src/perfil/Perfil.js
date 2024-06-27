import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from '../menu/menu';
import '../App.css';
import { Link } from "react-router-dom";

function Perfil(){

    const [nombrePerfil, setnombrePerfil] = useState('');

    const add = () => {
        axios.post("http://localhost:3001/crearperfil",{
            nombrePerfil: nombrePerfil,
        }).then(()=>{
            Swal.fire({
                title: "<strong>Registro exitoso!!</strong>",
                html: "<i>El perfil<strong>" + nombrePerfil + " </strong>fue registrado con éxito</i>",
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
            Perfil 
          </div>

          <div className="card-body">
            
            <form onSubmit={add}>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Perfil:</span>
                    <input type="text"
                        onChange={(event) => { setnombrePerfil(event.target.value); }}
                        className="form-control" value={nombrePerfil} placeholder="Ingrese nombre del perfil" aria-describedby="basic-addon1" />
                </div>

                <button type="submit" className="btn btn-primary">Crear Perfil</button>

            </form>


          </div>

          
        </div>
          
        </div>
    </div>
)
}

export default Perfil;