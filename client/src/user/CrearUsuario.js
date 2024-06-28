import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from '../menu/menu';
import '../App.css';
import { Link } from "react-router-dom";

function CrearUsuario(){

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [apellidoUsuario, setApellidoUsuario] = useState('');
    const [userBanec, setUsuarioBanec] = useState('');
    const [cargo, setCargo] = useState('');
    const [userBanecExists, setUserBanecExists] = useState(false);
    const [isLoading, setIsLoading]= useState(false);

    useEffect(()=>{
        const validarUserBanec = async () =>{
            if (userBanec.trim() !== ''){
                setIsLoading(true);

                try{
                    const response = await axios.get(`http://10.157.152.50:3001/validarusuario/${userBanec}`)
                    setUserBanecExists(response.data.exists)
                }catch(error){
                    Swal.fire({
                        tittle: '<strong>Problemas al validar el usuario</strong>',
                        icon:'error',
                        timer: 1000
                    })
                }finally{
                    setIsLoading(false)
                }

            }else{
                setUserBanecExists(false)
            }
        }

        const debounceTimer = setTimeout(validarUserBanec, 1000); // Esperar 300ms antes de validar

    return () => clearTimeout(debounceTimer); // Limpiar el temporizador al desmontar

    },[userBanec])
    

    const add = (event) => {
    event.preventDefault();
    if(userBanecExists){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El User Banec ya existe. Por favor, ingresa uno diferente.' 
          });
          return;
    }
    if(nombreUsuario == '' | apellidoUsuario == '' | userBanec == '' | cargo == ''){
        Swal.fire({
            title: "<strong>Ingrese todos los campos!!</strong>",
            icon: 'error',
            timer: 1000
        });
    }else{
        axios.post("http://10.157.152.50:3001/crearusuario", {
            nombreUsuario: nombreUsuario,
            apellidoUsuario: apellidoUsuario,
            userBanec: userBanec,
            cargo: cargo
        })
        .then(() => {
            limpiarData();
            Swal.fire({
                title: "<strong>Registro exitoso!!</strong>",
                html: "<i>El usuario <strong>" + userBanec + " </strong>fue registrado con éxito</i>",
                icon: 'success',
                timer: 1000
            });
        })
        .catch(error => {
            console.error('Error al crear usuario:', error.response ? error.response.data.error : error.message); // Muestra el mensaje de error del backend
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response ? error.response.data.error : 'Hubo un error al crear el usuario.' // Muestra el mensaje de error del backend
            });
        });
    }
    
};

const limpiarData=()=>{
    setNombreUsuario('');
    setApellidoUsuario('');
    setUsuarioBanec('');
    setCargo('');
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
                <span className="input-group-text" id="basic-addon1">Nombre:</span>
                    <input type="text"
                        onChange={(event) => { setNombreUsuario(event.target.value); }}
                        className="form-control" value={nombreUsuario} placeholder="Ingrese nombre del usuario" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Apellido:</span>
                    <input type="text"
                        onChange={(event) => { setApellidoUsuario(event.target.value); }}
                        className="form-control" value={apellidoUsuario} placeholder="Ingrese apellido del usuario" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Usuario Banecuador:</span>
                    <input type="text"
                        onChange={(event) => { setUsuarioBanec(event.target.value); }}
                        className="form-control" value={userBanec} placeholder="Ingrese el usuario de banecuador" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Cargo:</span>
                    <input type="text"
                        onChange={(event) => { setCargo(event.target.value); }}
                        className="form-control" value={cargo} placeholder="Ingrese cargo del usuario" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                    {/* ... */}
                    {userBanecExists ? (
                    <div className="text-danger">El Usuario de Banecuador ya existe</div>
                    ) : null}
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