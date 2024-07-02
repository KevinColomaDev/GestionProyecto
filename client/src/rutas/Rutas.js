import { Routes, Route } from "react-router-dom"
import CrearUsuario from "../user/CrearUsuario"
import Comision from "../comisiontecnica/Comision"
import Perfil from "../perfil/Perfil"
import Proyecto from "../proyectos/Proyecto"
import Gestion from "../gestion/gproyectos"

function Rutas() {
  return (
    <div className="rutas">
      <Routes>
        <Route path="/" element={ <CrearUsuario/> } />
        <Route path="/PerfilCT" element={ <Comision/> } />
        <Route path="/Perfil" element={ <Perfil/> } />
        <Route path="/Proyecto" element={ <Proyecto/> } />
        <Route path="/Gestion" element={<Gestion/>}/>
      </Routes>
    </div>
  )
}

export default Rutas