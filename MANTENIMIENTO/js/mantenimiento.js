var nuevoid;
var db=openDatabase("eva2022","1.0","eva2022",8080);

function limpiar(){
    document.getElementById("nombres").value="";
    document.getElementById("apellidos").value="";
    document.getElementById("edad").value="";
}

function eliminarUsuario(){
	$(document).one('click','button[type="button"]', function(event){
		let id=this.id;
		var lista=[];
		$("#ListaUsuarios").each(function(){
			var celdas=$(this).find('tr.Reg_'+id);
			celdas.each(function(){
				var registro=$(this).find('span.mid');
				registro.each(function(){
					lista.push($(this).html())
				});
			});
		});
		nuevoId=lista[0].substr(2);
		db.transaction(function(transaction){
			var sql="DELETE FROM usuarios WHERE id="+nuevoId+";"
			transaction.executeSql(sql,undefined,function(){
				alert("Registro borrado satisfactoriamente, Por favor actualice la tabla")
			}, function(transaction, err){
				alert(err.message);
			})
		})
	});
}

//Editar registro
function editarUsuario(){
    $(document).one('click', 'button[type="button"]',function(event){
    let id=this.id;
    var lista = [];
    $("#ListaUsuarios").each(function(){
        var celdas= $(this).find('tr.Reg_'+id);
        celdas.each(function(){
            var registro=$(this).find('span');
            registro.each(function(){
                lista.push($(this).html())
            });
        });
    }); 
    document.getElementById("nombres").value=lista[1];
    document.getElementById("apellidos").value=lista[2];
    document.getElementById("edad").value=lista[3];
    nuevoId=lista[0].substr(2);
    
})
}

//Crea la tabla de usuarios
$(function (){
    $("#Crear").click(function(){
        db.transaction(function(transaction){
            var sql="create table usuarios "+
            "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "+
            "nombres varchar(50) NOT NULL, "+
            "apellidos varchar(50) NOT NULL, "+
            "edad INTEGER(3) NOT NULL)";
            transaction.executeSql(sql,undefined,function(){
                alert("Tabla creada");
            }, function(transaction, err){
                alert(err.message);
            })
            });
        });
//Carga la lista de usuarios
$("#Listar").click(function(){
        cargarUsuarios();
})
//Lista a los usuarios
function cargarUsuarios(){
    $("#ListaUsuarios").children().remove();
    db.transaction(function(transaction){
        var sql="SELECT * FROM usuarios ORDER BY id DESC";
        transaction.executeSql(sql, undefined, function(transaction,result){
           if(result.rows.length){
               $("#ListaUsuarios").append('<tr><th>Código</th><th>Nombre</th><th>Apellidos</th><th>Edad</th><th></th><th></th></tr>');
               for(var i=0; i<result.rows.length; i++){
                   var row= result.rows.item(i);
                   var id= row.id;
                   var nombres= row.nombres;
                   var apellidos= row.apellidos;
                   var edad= row.edad;
                   $("#ListaUsuarios").append('<tr id="fila'+id+'" class="Reg_SM'+id+'"><td><span class="mid">SM'+
                   id+'</span></td><td><span>'+
                   nombres+'</span></td><td><span>'+
                   apellidos+'</span></td><td><span>'+
                   edad+'</span></td><td><button type="button" id="SM'+id+'" class="btn btn-success" onclick="editarUsuario()"><img src="imagenes/update.png"/></button></td><td><button type="button" id="SM'+id+'" class="btn btn-danger" onclick="eliminarUsuario()"><img src="imagenes/delete.png"/></button></td></tr>');
               }
           }else{
               $("#ListaUsuarios").append('<tr><td colspan="5" align="center">No existe registro de usuarios</td></tr>');
           }
            },function(transaction,err){
                alert(err.message);
            })
        }) 
    }
//Insertamos usuarios
$("#Insertar").click(function(){
    var nombres=$("#nombres").val();
    var apellidos=$("#apellidos").val();
    var edad=$("#edad").val();
    db.transaction(function(transaction){
        var sql="insert into usuarios(nombres,apellidos,edad) values(?,?,?)";
        transaction.executeSql(sql,[nombres,apellidos,edad], function(){

        }, function(transaction, err){
            alert(err.message);
        })
    })
        limpiar();
        cargarUsuarios();
    })


//Modificar registro
$("#Modificar").click(function(){
    var nuevoNombre=$("#nombres").val();
    var nuevoApellido=$("#apellidos").val();
    var nuevaEdad=$("#edad").val(); 
    db.transaction(function(transaction){
        var sql="UPDATE usuarios SET nombres='"+nuevoNombre+"', apellidos='"+nuevoApellido+"', edad='"+nuevaEdad+"' WHERE id="+nuevoId+";"
        transaction.executeSql(sql, undefined, function(){
           cargarUsuarios();
           limpiar();
        },function(transaction,err){
            alert(err.message);
        })
    })
})

})
