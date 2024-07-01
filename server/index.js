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

//------------------------------------------------------COMISION TECNICA----------------------------------------------------------------------------------------------

app.post('/crearperfilcomision',(req,res) =>{
  const {nombrePerfilComision, peso} = req.body;
  const sql = 'INSERT INTO comisiontecnica(nombre,peso) VALUES(?,?)'

  db.query(sql, [nombrePerfilComision, peso],
    (err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )
})

app.get('/perfilCT',(req,res) =>{
  db.query('SELECT * FROM comisiontecnica',
    (err,result) =>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )
})

//---------------------------------------------------------PERFIL-----------------------------------------------------------------------------------------------------

app.post('/crearperfil',(req,res)=>{
  const {nombrePerfil, peso} = req.body;
  const sql ='INSERT INTO perfil(nombre,peso) VALUES(?,?)';

  db.query(sql, [nombrePerfil, peso],
    (err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )
})

app.get('/perfil', (req,res) =>{
  db.query('SElECT * FROM perfil', 
    (err, result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    })
})
//---------------------------------------------------------PROYECTO---------------------------------------------------------------------------------------------------

app.post('/crearproyecto', (req,res) => {
  const {nombreProyecto, complejidad} = req.body
  const sql = 'INSERT INTO proyectos (nombre, complejidad) VALUES (?,?)';

  db.query(sql, [nombreProyecto, complejidad],
    (err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.send(result)
      }
    }
  )
})

app.get('/proyectos', (req,res)=>{
  db.query('SELECT * FROM proyectos',
    (err, result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )
})
//---------------------------------------------------------USUARIOS-------------------------------------------------------------------------------------------------

app.get('/validarusuario/:userBanec', async (req, res) => {
  const userBanec = req.params.userBanec;

  try {
    const sql = 'SELECT COUNT(*) as count FROM usuario WHERE user = ?';
    const [rows, fields] = await db.promise().query(sql, [userBanec]);
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