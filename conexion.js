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

conexion.query('SELECT * FROM usuario', function(error,results,fields){
    if(error)
    throw error;

    results.forEach(result=>{
        console.log(result);
    });
})

conexion.end();