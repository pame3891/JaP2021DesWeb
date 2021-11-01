//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var fecha = new Date();
var dia = fecha.getDate();
var mes = fecha.getMonth() +1;

function editarUsuario(){
    let nombre = document.getElementById('modal-nombre').value;
    let apellido = document.getElementById('modal-apellido').value;
    let edad = document.getElementById('modal-edad').value;
    let telefono = document.getElementById('modal-telefono').value;
    let mail = document.getElementById('modal-mail').value;
    

    document.getElementById("name").innerHTML = nombre;
    document.getElementById("surname").innerHTML = apellido;
    document.getElementById("age").innerHTML = edad;
    document.getElementById("telephone").innerHTML = telefono;
    document.getElementById("mail").innerHTML = mail;
    

    localStorage.setItem("nombre",nombre);
    localStorage.setItem("apellido",apellido);
    localStorage.setItem("edad",edad);
    localStorage.setItem("telefono",telefono);
    localStorage.setItem("mail",mail);
    

}




document.addEventListener("DOMContentLoaded", function (e) {

if( dia <= 31 && mes === 10){
      document.getElementById("fiestas").href= "css/halloween-profile.css";
}

    document.getElementById("name").innerHTML = localStorage.getItem("nombre");
    document.getElementById("surname").innerHTML = localStorage.getItem("apellido");
    document.getElementById("age").innerHTML = localStorage.getItem("edad");
    document.getElementById("telephone").innerHTML = localStorage.getItem("telefono");
    document.getElementById("mail").innerHTML = localStorage.getItem("mail");

    if(localStorage.getItem("foto")){
    document.querySelector("#picture").setAttribute("src", localStorage.getItem("foto"));
}
   
    
});

function pictureFile(){
    let vista = document.getElementById("picture");
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    reader.onloadend = function (){
        vista.src = reader.result;
        document.getElementById('picture').innerHTML= reader.result;
        localStorage.setItem ("foto", reader.result);
        
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}



