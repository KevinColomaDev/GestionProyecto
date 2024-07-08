import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from '../menu/menu';
import '../App.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

function Dashboard() {
  const [complejidadTotal, setComplejidadTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataGrafico, setDataGrafico] = useState([]); // Datos para el gráfico


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complejidadTotalResponse, usersResponse] = await Promise.all([
          axios.get('http://10.157.152.50:3001/complejidadTotal'),
          axios.get('http://10.157.152.50:3001/usuarios')
        ]);

        const totalComplejidad = complejidadTotalResponse.data.complejidadTotal;
        const usuarios = usersResponse.data;

        setComplejidadTotal(totalComplejidad);
        setUsers(usuarios);

        // Calcular cargas de trabajo y preparar datos para el gráfico
        const cargasTrabajo = await Promise.all(
          usuarios.map(async user => {
            const carga = await calcularCargaTrabajoUsuario(user.idusuario, totalComplejidad);
            return { name: user.user, value: parseFloat(carga) }; 
          })
        );
        setDataGrafico(cargasTrabajo); // Actualizar el estado dataGrafico

        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener data:', error);
        Swal.fire({
          title: '<strong>Error al obtener la información</strong>',
          icon: 'error',
          timer: 1000
        });
      }
    };

    fetchData();
  }, []); // Ejecutar solo una vez al montar el componente

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Generar colores únicos para cada usuario
  const COLORS = useMemo(() => {
    return users.map(() => getRandomColor());
  }, [users]);

  const dataGraficoFiltrado = useMemo(() => {
    return dataGrafico.filter(entry => entry.value > 0);
  }, [dataGrafico]);

  const calcularCargaTrabajoUsuario = async (userId, complejidadTotal) => {
    try {
      const response = await axios.get(`http://10.157.152.50:3001/asignaciones/${userId}`);
      const proyectosAsignados = response.data;

      const complejidadUsuario = proyectosAsignados.reduce((total, proyecto) => total + proyecto.complejidad, 0);
      const cargaTrabajo = (complejidadUsuario / complejidadTotal) * 100;
      return cargaTrabajo.toFixed(1); // Redondear a un decimal
    } catch (error) {
      console.error('Problemas al calcular la carga laboral:', error);
      return 0;
    }
  };

  return (
    <div className="container-fluid d-flex">
      <Sidebar />
      <div className="App flex-grow-1">
        <div className="card text-center">
          {/* ... (card-header) ... */}
          <div className="card-body">
            {isLoading ? (
              <p>Cargando datos...</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataGraficoFiltrado}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}%`} // Mostrar nombre y porcentaje
                  >
                    {dataGraficoFiltrado.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} /> // Usar color único
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
