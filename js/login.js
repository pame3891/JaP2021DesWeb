//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.




function verificar() {
    let dato = document.getElementById('nombre');
    let msj = document.getElementById('msj');
    let contrasena = document.getElementById('password');
    let usuario = {};

  
    if (dato.value.trim() === '' || contrasena.value.trim()=== '') 
    {
        dato.classList.add("isInvalid");
        msj.innerHTML= "Debe completar los campos vacíos";
        msj.style.color="red";
        msj.style.display="block";

    }else{

        location.href ="index.html";
        usuario.nombre = dato.value;
        usuario.estado = "conectado";
        
       
        localStorage.setItem('usuario',JSON.stringify(usuario));
    
}   var miCheckbox = document.getElementById('recordarme').innerHTML= "recordarme";
miCheckbox.addEventListener('click', function() {
  if(miCheckbox.checked) {
   localStorage.setItem('usuario',JSON.stringify(usuario));
  } else {
    sessionStorage.setItem('usuario',JSON.stringify(usuario));
  }
});
document.addEventListener("DOMContentLoaded", ()=>{
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.estado== 'conectado'){
        location.href= "index.html";
    }
});
}


function desconectar(){
  localStorage.clear();
  location.href="login.html";
  signOut();
}