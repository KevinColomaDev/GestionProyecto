const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require ('cors');
const async = require('async');

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'kcoloma',
    password: '1234',
    database: 'gestion_proyectos'
});

app.listen(3001, () => {
    console.log('Corriendo en el puerto 3001')
})

app.post('/crearusuario', async (req, res) => {
    const { nombreUsuario, cargo } = req.body;
  
    // Validación de datos de entrada
    if (!nombreUsuario || !cargo) {
      return res.status(400).json({ error: 'Nombre de usuario y cargo son obligatorios' });
    }
  
    try {
      // Uso de consultas parametrizadas para prevenir inyección SQL
      const [result] = await db.query(
        'INSERT INTO usuario (nombre, cargo) VALUES (?, ?)',
        [nombreUsuario, cargo]
      );
  
      // Manejo de inserción exitosa
      if (result.affectedRows === 1) {
        res.status(201).json({ message: 'Usuario creado con éxito', id: result.insertId });
      } else {
        res.status(500).json({ error: 'Error al crear usuario' });
      }
    } catch (err) {
      // Manejo de errores de la base de datos
      console.error('Error en la base de datos:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  app.get('/usuarios', (req, res)=>{
    db.query('Select * from usuario',
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
  })