var mysql= require('mysql');
var conexion= mysql.createConnection({
host: 'localhost',
database: 'eva2022',
user: 'root',
password: 'root',
});

conexion.connect(function(error) {
    if(error){
        throw error;
    }else{
        console.log("Conexión establecida correctamente");
    }
});

conexion.query('UPDATE usuario set nombre="Alejandro", apellido="Magno", edad=33 where id=6',function(error,results){
    if(error){
        throw error;
    }else{
        console.log("El usuario ha sido modificado de manera exitosa", results);
    }
});

conexion.query('UPDATE usuario set nombre="Julio", apellido="César", edad=55 where id=9',function(error,results){
    if(error){
        throw error;
    }else{
        console.log("El usuario ha sido modificado de manera exitosa", results);
    }
});

conexion.query('UPDATE usuario set nombre="Juan", apellido="Velasquez", edad=25 where id=7',function(error,results){
    if(error){
        throw error;
    }else{
        console.log("El usuario ha sido modificado de manera exitosa", results);
    }
});


conexion.end();