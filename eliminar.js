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

conexion.query('DELETE FROM usuario where id=7',function(error,results){
    if(error){
        throw error;
    }else{
        console.log("El usuario ha sido eliminado exitosamente", results);
    }
});


conexion.end();