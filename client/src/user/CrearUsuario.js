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
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [selectedUser, setSelectedUser] = useState(null);
    const [proyectosPerfiles, setProyectosPerfiles] = useState([]);

    useEffect(() =>{
        
    })

    const getUsuarios = async ()=>{
        try{
            const response = await axios.get("http://10.157.152.50:3001/usuarios")
                setUsuarios(response.data);
            }catch (error){
                console.error('Error fetching data:' , error);
            }
        }

    useEffect(()=>{
        getUsuarios();
    }, [])
        
    

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
    

    const openModal = async (idusuario) => {
        const response = await axios.get(`http://10.157.152.50:3001/ProyectosPerfiles/${idusuario}`);
        setProyectosPerfiles(response.data);
        setSelectedUser(idusuario);
        setShowModal(true);
      };
    
      // Función para cerrar el modal
      const closeModal = () => {
        setSelectedUser(null);
        setShowModal(false);
      };

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
            getUsuarios();
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

const deleteusuario = async (idusuario) =>{

    try {
        // 1. Fetch User's Projects
        const userProjectsResponse = await axios.get(`http://10.157.152.50:3001/nombreproyectosusuario/${idusuario}`);
        const userProjects = userProjectsResponse.data;
        console.log(userProjects);
  
        if (userProjects.length > 0) {
          // 2. SweetAlert Confirmation with Project List
          const confirmation = await Swal.fire({
            title: "Confirmación",
            html: `
              El usuario está vinculado a los siguientes proyectos:
              <ul>${userProjects.map(p => `<li>${p.nombre}</li>`).join('')}</ul>
              ¿Desea eliminar al usuario y desvincularlo de estos proyectos?
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar y desvincular",
            cancelButtonText: "Cancelar",
          });
  
          if (confirmation.isConfirmed) {
            // 3. Delete Project Assignments (if confirmed)
            await axios.delete(`http://10.157.152.50:3001/deletecargausuario/${idusuario}`)
       
  
            // 4. Delete User 
            await axios.delete(`http://10.157.152.50:3001/deleteusuario/${idusuario}`);
  
            Swal.fire({
              title: "Eliminación exitosa!!",
              html: "<i>El usuario se eliminó con éxito</i>",
              icon: 'success',
              timer: 1000
            });

            getUsuarios();
          }
        } else {
          // User has no projects, proceed with deletion directly
          await axios.delete(`http://10.157.152.50:3001/deleteusuario/${idusuario}`);
  
          Swal.fire({
            title: "Eliminación exitosa!!",
            html: "<i>El usuario se eliminó con éxito</i>",
            icon: 'success',
            timer: 1000
          });
        }
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al eliminar el usuario.' 
        });
      }

    
}


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

        <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Proyectos Asignados</th>
                            <th scope="col"></th>
                            
                        </tr> 

                    </thead>
                    <tbody>
                        {
                            usuarios
                            .map((val, key) => {
                                return (
                                    <tr key={val.idusuario}>
                                        <td>{val.nombre}</td>
                                        <td>{val.apellido}</td>
                                        <td>{val.user}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button
                                                    onClick={()=>{
                                                        openModal(val.idusuario)
                                                    }}
                                                className="btn btn-success">Ver</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button
                                                    onClick={() => {
                                                        deleteusuario(val.idusuario);
                                                    }}
                                                    className="btn btn-danger">Eliminar</button>
                                            </div>
                                        </td>
                                        
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">   

              <div className="modal-header">
                <h5 className="modal-title">Proyectos Asignados</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">   

                {/* Muestra los detalles del usuario seleccionado */}
                {selectedUser && (
                  <div>
                        <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Proyectos</th>
                            <th scope="col">Perfil</th>
                            <th scope="col">Comision tecnica</th>
                        </tr> 

                    </thead>
                    <tbody>
                        {
                            proyectosPerfiles
                            .map((val, key) => {
                                return (
                                    <tr key={val.nombreProyecto}>
                                        <td>{val.nombreProyecto}</td>
                                        <td>{val.nombrePerfil}</td>
                                        <td>{val.nombreCT}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
              </div>
            </div>   

          </div>
        </div>   

      )}
        </div>
    </div>
)
}

export default CrearUsuario;