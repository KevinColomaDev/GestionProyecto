import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from '../menu/menu';
import '../App.css';
import { Link } from "react-router-dom";

function Perfil(){

    const [nombrePerfil, setnombrePerfil] = useState([]);
    const [nombreUser, setnombreUser] = useState([]);
    const [nombreProyecto, setnombreProyecto] = useState([]);
    const [nombrePerfilCT, setnombrePerfilCT] = useState([]);
    const [selectNombrePerfil, setSelectNombrePerfil] = useState('');
    const [selectnombreUser, setselectnombreUser] = useState('');
    const [selectnombreProyecto, setselectnombreProyecto] = useState('');
    const [selectnombrePerfilCT, setselectnombrePerfilCT] = useState('');
    const [enComisionTecnica, setEnComisionTecnica] = useState(null);

    const estadoEnComision = (event) =>{
        setEnComisionTecnica(event.target.value === 'si');
    }

    const CambiarPerfil = (event) => {
        if(enComisionTecnica) {
            setselectnombrePerfilCT(event.target.value);
        }else{
            setSelectNombrePerfil(event.target.value);
        }
    }

    const add = () => {
        axios.post("http://localhost:3001/crearcarga",{
            fk_IdNombrePerfil: enComisionTecnica ? selectnombrePerfilCT : selectNombrePerfil ,
            fk_IdNombreUser: selectnombreUser,
            fk_IdNombreProyecto: selectnombreProyecto,
        }).then(()=>{
            Swal.fire({
                title: "<strong>Registro exitoso!!</strong>",
                html: "<i>La carga de trabajo fue registrada con éxito</i>",
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
            Carga laboral 
          </div>

          <div className="card-body">
            
            <form onSubmit={add}>
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Usuario:</span>
                    <select className="form-select" id="inputGroupSelect02" onChange={(e) => setselectnombreUser(e.target.value)} value={selectedAmbiente}>
                        <option value="">Seleccionar Usuario</option>
                            {
                                nombreUser.map(nombres => (
                                    <option key={nombres.idusuario} value={nombres.idusuario}>{nombres.nombre}</option>
                                    ))
                            }
                    </select>    
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Proyecto:</span>
                    <select className="form-select" id="inputGroupSelect02" onChange={(e) => setselectnombreProyecto(e.target.value)} value={selectedAmbiente}>
                        <option value="">Seleccionar Proyecto</option>
                            {
                                nombreProyecto.map(proyectos => (
                                    <option key={proyectos.idproyectos} value={proyectos.idproyectos}>{proyectos.nombre}</option>
                                    ))
                            }
                    </select>    
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">¿En comisión técnica?</span>
                    <select className="form-select"  onChange={estadoEnComision}>
                        <option value="">Seleccionar</option>
                        <option value="si">Si</option>
                        <option value="no">No</option>
                    </select>    
                </div>

                {enComisionTecnica !== null &&(
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Perfil:</span>
                        <select className="form-select" onChange={CambiarPerfil} value={enComisionTecnica ? selectnombrePerfilCT : selectNombrePerfil}>
                            <option value="">Seleccionar Perfil</option>
                                {enComisionTecnica ? (
                                    nombrePerfilCT.map(perfil => (
                                        <option key={perfil.idcomisiontecnica} value={perfil.idcomisiontecnica}>{perfil.nombre}</option>
                                    ))
                                ): (
                                    nombrePerfil.map(perfil => (
                                        <option key={perfil.idperfil} value={perfil.idperfil}> {perfil.nombre} </option>
                                    ))
                                )}
                        </select>    
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Crear Carga</button>

            </form>
          </div>     
        </div>     
        </div>
    </div>
)
}

export default Perfil;