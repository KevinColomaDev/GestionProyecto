import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from '../menu/menu';
import '../App.css';
import { Link } from "react-router-dom";

function Comision(){

    const [nombrePerfilComision, setnombrePerfilComision] = useState('');
    const [peso,setPeso] = useState('');

    const add = (event) => {
        event.preventDefault();
        if(nombrePerfilComision == '' | peso == ''){
            Swal.fire({
                title: "<strong>Ingrese todos los campos!!</strong>",
                icon: 'error',
                timer: 1000
            });
        }else{
            axios.post("http://10.157.152.50:3001/crearperfilcomision",{
                nombrePerfilComision: nombrePerfilComision,
                peso:peso
            }).then(()=>{
                limpiarData();
                Swal.fire({
                    title: "<strong>Registro exitoso!!</strong>",
                    html: "<i>El perfil <strong>" + nombrePerfilComision + " </strong>fue registrado con éxito</i>",
                    icon: 'success',
                    timer: 1000
                })
            })
        }  
    }

    const limpiarData=()=>{
        setnombrePerfilComision('');
        setPeso('');
    }

return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="App flex-grow-1"> {/* Utiliza flex-grow-1 para que ocupe el espacio restante */}
        <div className="card text-center">

          <div className="card-header">
            Perfil comisión técnica
          </div>

          <div className="card-body">
            
            <form onSubmit={add}>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Perfil:</span>
                    <input type="text"
                        onChange={(event) => { setnombrePerfilComision(event.target.value); }}
                        className="form-control" value={nombrePerfilComision} placeholder="Ingrese nombre del perfil" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Peso:</span>
                    <input type="text"
                        onChange={(event) => { setPeso(event.target.value); }}
                        className="form-control" value={peso} placeholder="Ingrese peso del perfil" aria-describedby="basic-addon1" />
                </div>

                <button type="submit" className="btn btn-primary">Crear Perfil</button>

            </form>


          </div>

          
        </div>
          
        </div>
    </div>
)
}

export default Comision;