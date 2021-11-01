//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const carrito_JaP_URL = " https://japdevdep.github.io/ecommerce-api/cart/654.json";
var carrito = [];
let cantActualizadas = [];
let moneda= true;
let suma = 0;


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(carrito_JaP_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos = resultObj.data;
            carrito = articulos.articles;

            cantIniciales();
            update();
            mostrarCarrito(carrito);
            subtotales();
            totales();
            totalEnvio();
           
        }
            
        
    });
      document.getElementById("convertirPesos").addEventListener("click", ()=> {
          pesos();
      })
});

function cantIniciales(){
    let i = 0; 
    carrito.forEach(elemento => {
        cantActualizadas[i] = elemento.count;
        i++;
    });
}

const cartConteiner = document.getElementById('carrito');

function pesos(){
    moneda = !moneda;
    
    mostrarCarrito(carrito);
    subtotales();
    totales();
    totalEnvio();
}


function subtotales(){

 //const itemCartTotal = document.querySelector('.costoTotal');

suma = 0;
 let subtotal = 0;

 if(moneda === true){

 for (let i=0; i<carrito.length; i++){
    
    if (carrito[i].currency === "UYU"){
        subtotal = carrito[i].unitCost * cantActualizadas[i];
     document.getElementById ('res'+i).innerHTML = carrito[i].currency + " " + subtotal;
     suma += subtotal;
    }else{
        subtotal = carrito[i].unitCost * cantActualizadas[i] * 40;
        document.getElementById ('res'+i ).innerHTML = "UYU" + " " + subtotal;
        suma += subtotal;
    }
     
 }
 
     
 }else {
     for (let i=0; i<carrito.length; i++){

    if(carrito[i].currency === "USD"){
        subtotal = carrito[i].unitCost * cantActualizadas[i];
        document.getElementById ('res'+i).innerHTML = carrito[i].currency + " " + subtotal;
        suma += subtotal;
    }else{
        subtotal = carrito[i].unitCost * cantActualizadas[i] / 40;
        document.getElementById ('res'+i).innerHTML = "USD" + " " + subtotal;
        suma += subtotal;

     }
 }


}
}

function totales(){
    
    let finalTotal = document.getElementById("costoTotal");
    
     finalTotal.innerHTML = "$" + " " + suma;

}


function mostrarCarrito(array){
    htmlContentToAppend = "";

    
    for (let i=0; i<array.length; i++){

      datos = array[i];
    //carrito = articulos.articles[datos];  
  

    htmlContentToAppend += `

    <tr>
        <th scope="row"><i class="far fa-check-circle fa-2x"></i></th>
        <td class="tabla_productos">
        <img src=" ${datos.src} " class="img-thumbnail">
        <h6 class="title">${datos.name}</h6>
        </td>
        <td class="tabla_precio"><p>${datos.currency} <span class="tabla_precio">${datos.unitCost}</span></p></td>
        <td class="tabla_cantidad">
        <input type="number" value="${cantActualizadas[i]}" class="cantidad" onchange="update(); subtotales(); totales();">
        <button class="delete btn btn-danger"><i class="far fa-trash-alt"></i></button>
        </td>
        <td class="tabla_subtotal" id='res${i}'> </td>
      </tr>

`
}
document.getElementById("carrito").innerHTML = htmlContentToAppend;

}

function update(){
let input = document.getElementsByClassName('cantidad');

for (i = 0; i<input.length; i++ ){
    cantActualizadas[i] = input[i].value;
}

}

function totalEnvio(){
    if(document.conjuntoEnvios.envio[0].checked){
        suma += (document.getElementById('costoTotal') * 15) /100;
    }
    
  document.getElementById("totalEnv").innerHTML = suma;
}

function compraButton(){
swal({
    title: "Grandioso!",
    text: "Has realizado tu compra exitosamente!",
    icon: "success",
    button: "Genial!",
  });
}

var amountScrolled = 200;
var amountScrolledNav = 25;

$(window).scroll(function() {
  if ( $(window).scrollTop() > amountScrolled ) {
    $('button.back-to-top').addClass('show');
  } else {
    $('button.back-to-top').removeClass('show');
  }
});

$(document).ready(function(){

    $('.fa-angle-double-up').click(function(){
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });

    $(window).scroll(function(){
        if( $(this).scrollTop() > 0 ){
            $('.fa-angle-double-up').slideDown(300);
        } else {
            $('.fa-angle-double-up').slideUp(300);
        }
    });

});

function desconectar(){
    localStorage.clear();
    location.href="login.html";
    signOut();  }