import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from '../menu/menu';
import '../App.css';
import { Link } from "react-router-dom";

function Gproyectos(){

    const [selectUser, setSelectUser] = useState('');
    const [selectProyecto, setSelectProyecto] = useState('');
    const [selectPerfil, setSelectPerfil] = useState('');
    const [selectPerfilCT, setSelectPerfilCT] = useState('');
    const [users, setUsers] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [perfiles, setPerfiles] = useState([]);
    const [perfilesCT, setPerfilesCT] = useState([]);
    const [tipo, setTipo] = useState('');

    useEffect(()=>{
        const GetData = async () =>{
            try{
                const[usersResponse, proyectosResponse, perfilesResponse, perfilesCTResponse ]  = await Promise.all([
                    axios.get('http://10.157.152.50:3001/usuarios'),
                    axios.get('http://10.157.152.50:3001/proyectos'),
                    axios.get('http://10.157.152.50:3001/perfil'),
                    axios.get('http://10.157.152.50:3001/perfilCT')

                ])
                
                setUsers(usersResponse.data);
                setProyectos(proyectosResponse.data);
                setPerfiles(perfilesResponse.data);
                setPerfilesCT(perfilesCTResponse.data);

            }catch (error){
                Swal.fire({
                    title: '<strong>Error al obtener la información</strong>',
                    icon: 'error',
                    timer: 1000
                })
            }
        }
        GetData();
    }, []);

    const add = (event) => {
        event.preventDefault();
        if(selectUser === '' | selectProyecto === ''){
            Swal.fire({
                title: "<strong>Ingrese todos los campos!!</strong>",
                icon: 'error',
                timer: 1000
            });
        }else if(tipo === ''){
            Swal.fire({
                title: "<strong>Ingrese el tipo de perfil!!</strong>",
                icon: 'error',
                timer: 1000
            });
        }else if(selectPerfil === '' && tipo === 'Admin' ){
            Swal.fire({
                title: "<strong>Ingrese un perfil</strong>",
                icon: "error",
                timer: 1000
            })
        }else if(selectPerfilCT === '' && tipo === 'CT'){
            Swal.fire({
                title: "<strong>Ingrese un perfil de comisión técnica</strong>",
                icon: "error",
                timer: 1000
        })
        }else{
            axios.post('http://10.157.152.50:3001/gestion',{
                fk_iduser: selectUser,
                fk_idproyecto: selectProyecto,
                fk_idperfil: tipo === 'Admin' ? selectPerfil :null,
                fk_idperfilct: tipo === 'CT' ? selectPerfilCT: null
            })
            .then(()=>{
                limpiarData();
                Swal.fire({
                    title: '<strong>Registro exitoso</strong>',
                    html: '<i>El proyecto fue asignado con éxito</i>',
                    icon: 'success',
                    timer: 1000
                })
            })
            .catch(() =>{
                Swal.fire({
                    title:'Hubo un error al asignar el prooyecto',
                    icon: 'error',
                    timer: 1000
                })
            })
            
        }
        
        
       
    }

    const limpiarData=()=>{
        setSelectPerfil('');
        setSelectPerfilCT('')
        setSelectProyecto('');
        setSelectUser('');
        setTipo('');
    }

return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="App flex-grow-1"> {/* Utiliza flex-grow-1 para que ocupe el espacio restante */}
        <div className="card text-center">

          <div className="card-header">
            Gestión de proyectos SIT BANECUADOR
          </div>

          <div className="card-body">
            
            <form onSubmit={add}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Usuario:</span>
                    <select className="form-select" id="inputGroupSelect02" onChange={(e)=> setSelectUser(e.target.value)} value={selectUser}>
                        <option value=''>Seleccione un usuario</option>
                        {
                            users.map(user =>{
                                return(
                                    <option key={user.idusuario} value={user.idusuario}>{user.user}</option>
                                )
                                
                            })
                        }
                    </select>
                </div>

                <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Proyecto:</span>
                        <select className="form-select" id="inputGroupSelect02" onChange={(e)=> setSelectProyecto(e.target.value)} value={selectProyecto}>
                            <option value=''> Seleccionar un proyecto:</option>
                            {
                                proyectos.map(proyecto =>{
                                    return (
                                        <option key={proyecto.idproyectos} value={proyecto.idproyectos}>{proyecto.nombre}</option>
                                    )
                                    
                                })
                            }
                        </select>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Tipo de perfil</span>
                    <select className="form-select" id="inputGroupSelect02" value={tipo} onChange={(e)=>setTipo(e.target.value)} >
                        <option value=''>Seleccionar tipo de perfil</option>
                        <option value='CT'>Comisión técnica</option>
                        <option value='Admin'>Administracion de proyecto</option>
                    </select>
                </div>

                {
                    tipo === 'CT' && (
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Commision Tecnica:</span>
                            <select className="form-select" id="inputGroupSelect02" onChange={(e)=> setSelectPerfilCT(e.target.value)} value={selectPerfilCT}>
                                <option value=''> Seleccionar un perfil:</option>
                                {
                                    perfilesCT.map(perfilCt =>{
                                        return(
                                            <option key={perfilCt.idcomisiontecnica} value={perfilCt.idcomisiontecnica}>{perfilCt.nombre}</option>
                                        )
                                        
                                    })
                                }
                            </select>
                        </div>
                    )
                }

                {
                    tipo === 'Admin' && (
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Administracion de proyectos:</span>
                            <select className="form-select" id="inputGroupSelect02" onChange={(e)=> setSelectPerfil(e.target.value)} value={selectPerfil}>
                                <option value=''> Seleccionar un perfil:</option>
                                {
                                    perfiles.map(perfil =>{
                                        return(
                                            <option key={perfil.idperfil} value={perfil.idperfil}>{perfil.nombre}</option>
                                        )  
                                    })
                                }
                            </select>
                        </div>
                    )
                }

                <button type="submit" className="btn btn-primary">Crear</button>

            </form>


          </div>

          
        </div>
          
        </div>
    </div>
)
}

export default Gproyectos;