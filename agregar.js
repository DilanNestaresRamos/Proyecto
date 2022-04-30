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

conexion.query('INSERT INTO usuario (id, nombre, apellido, edad) VALUES(6,"Pedro","Sarmiento",50)',function(error,results){
    if(error){
        throw error;
    }else{
        console.log("Registro exitoso", results);
    }
});

conexion.query('INSERT INTO usuario (id, nombre, apellido, edad) VALUES(7,"Samuel","Ferrer Quilca",21)',function(error,results){
    if(error){
        throw error;
    }else{
        console.log("Registro exitoso", results);
    }
});

conexion.query('INSERT INTO usuario (id, nombre, apellido, edad) VALUES(8,"Helver","Rodriguez Linares",21)',function(error,results){
    if(error){
        throw error;
    }else{
        console.log("Registro exitoso", results);
    }
});

conexion.query('INSERT INTO usuario (id, nombre, apellido, edad) VALUES(9,"Naomi","Ciprian Paredes",22)',function(error,results){
    if(error){
        throw error;
    }else{
        console.log("Registro exitoso", results);
    }
});

conexion.end();