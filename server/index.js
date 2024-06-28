const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require ('cors');
const async = require('async');

app.use(express.json());
app.use(cors());


const db = mysql.createPool({
    host: 'localhost',
    user: 'kcoloma',
    password: '1234',
    database: 'gestion_proyectos'
});

app.listen(3001, () => {
    console.log('Corriendo en el puerto 3001')
})
//---------------------------------------------------------PERFIL---------------------------------------------------------------------------------------------------



//---------------------------------------------------------USUARIOS-------------------------------------------------------------------------------------------------

app.get('/validarusuario/:userBanec', async (req, res) => {
  const userBanec = req.params.userBanec;

  try {
    const sql = 'SELECT COUNT(*) as count FROM usuario WHERE user = ?';
    
    // Ejecuta la consulta usando la interfaz de promesas
    const [rows, fields] = await db.promise().query(sql, [userBanec]);

    // Verifica si existe el usuario (el resultado de la consulta será un array con un objeto)
    const exists = rows[0].count > 0;

    res.json({ exists });
  } catch (err) {
    console.error('Error al validar usuario:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});




app.post('/crearusuario', (req, res) => {

  const {nombreUsuario, apellidoUsuario, userBanec, cargo} = req.body
  const sql = "INSERT INTO usuario (nombre,apellido,user,cargo) VALUES (?,?,?,?)"

  db.query(sql,[nombreUsuario,apellidoUsuario,userBanec, cargo],
    (err, result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )

}
)
  
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