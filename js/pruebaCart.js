const carrito_JaP_URL = " https://japdevdep.github.io/ecommerce-api/cart/654.json";
const cartConteiner = document.getElementById('carrito');
var carrito = [];
let cantActualizadas = [];
let moneda= true;
let suma = 0;
let radioEnv = document.getElementsByName("envio");
let tarjetaBanco = false;
let cuentaBancaria = false;
let formulario = false;
let modal = false;



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(carrito_JaP_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos = resultObj.data;
            carrito = articulos.articles;

            cantIniciales();
            update();
            pesos();
            mostrarCarrito(carrito);
            subtotales();
            
        }
            
    });
  document.getElementById("convertirPesos").addEventListener("click", ()=> {
          pesos();
    })
  
    document.getElementById("tarjetaCredito").addEventListener("click", ()=>{
         document.getElementById("username").disabled = false;
         document.getElementById("cardNumber").disabled = false;
         document.getElementById("vencNumber").disabled = false;
         document.getElementById("cvv").disabled = false;
         document.getElementById("cuentaNum").disabled = true;

         tarjetaBanco = true;
         cuentaBancaria = false;
    })

    document.getElementById("cuentaBanco").addEventListener("click", ()=>{
        document.getElementById("username").disabled = true;
        document.getElementById("cardNumber").disabled = true;
        document.getElementById("vencNumber").disabled = true;
        document.getElementById("cvv").disabled = true;
        document.getElementById("cuentaNum").disabled = false;
        tarjetaBanco = false;
        cuentaBancaria = true;
    })    
      
});

function mostrarCarrito(array){
    htmlContentToAppend = "";

    for (let i=0; i<array.length; i++){

      datos = array[i];
   
      htmlContentToAppend += `

      <tr>
          <th scope="row"><i class="far fa-check-circle fa-2x"></i></th>
            <td class="tabla_productos">
              <img src=" ${datos.src} " class="img-thumbnail">
               <h6 class="title">${datos.name}</h6>
            </td>
            <td class="tabla_precio">
              <p>${datos.currency} <span class="tabla_precio">${datos.unitCost}</span></p>
            </td>
            <td class="tabla_cantidad">
              <input type="number" value="${cantActualizadas[i]}" class="cantidad" onchange="update(); subtotales();">
             <button class="delete btn btn-danger" onclick="eliminar(${i})"><i class="far fa-trash-alt"></i></button>
             </td>
            <td class="tabla_subtotal" id='res${i}'> </td>
      </tr>`
    }
   document.getElementById("carrito").innerHTML = htmlContentToAppend;

}

function subtotales(){
   
    suma = 0;
    let subtotal = 0;
    let envio = 0;
    let radioEnvio = document.getElementsByName("envio");
       
   
    for (let i=0; i<carrito.length; i++){
     subtotal = carrito[i].unitCost * cantActualizadas[i];
     document.getElementById ('res'+i).innerHTML = carrito[i].currency + " " + subtotal;
        suma += subtotal;
    }
   
    for (let i=0; i<radioEnvio.length; i++){
         
       if(radioEnvio[i].checked){
           envio += parseFloat(radioEnvio[i].value) * parseFloat(suma) /100;
           document.getElementById("costoEnvio").innerHTML = envio;
           
        }  
    }
     document.getElementById("costoTotal").innerHTML = suma;
     document.getElementById("totalEnv").innerHTML = parseFloat(envio) + parseFloat(suma);

}


function cantIniciales(){
    let i = 0; 
    carrito.forEach(elemento => {
        cantActualizadas[i] = elemento.count;
        i++;
    });
}



function pesos(){
    moneda = !moneda;
    if(moneda){
        for(let i = 0; i<carrito.length; i++){
            if(carrito[i].currency === "USD"){
                carrito[i].currency = "UYU";
                carrito[i].unitCost = parseFloat(carrito[i].unitCost * 40);
            }
        }

    }else{
        for(let i = 0; i<carrito.length; i++){
            if(carrito[i].currency === "UYU"){
                carrito[i].currency = "USD";
                carrito[i].unitCost = parseFloat(carrito[i].unitCost / 40);
            }
        }


    }
    
    mostrarCarrito(carrito);
    subtotales();
}

function eliminar(i){
    carrito.splice(i,1);
    mostrarCarrito(carrito);
    subtotales();

}


function update(){
let input = document.getElementsByClassName('cantidad');

for (i = 0; i<input.length; i++ ){
    cantActualizadas[i] = input[i].value;
}

}

function metodoPago(elegir){
    
 
    if (elegir === 1){
        document.getElementById("metodoElegido").innerHTML = " Tarjeta de crédito";
        
       
    }if (elegir === 2){
        document.getElementById("metodoElegido").innerHTML = " Cuenta bancaria";
    }
}

function compraButton(){
    let direccion = document.getElementById("direccion").value.trim();
    let numPuerta = document.getElementById("numPuerta").value.trim();
    let esquina = document.getElementById("esquina").value.trim();

    if(direccion === "" || numPuerta === "" || esquina === ""){
        formulario = false;
    }else{
        formulario = true;
    }

    let nombreUsu = document.getElementById("username").value.trim();
    let numTarjeta = document.getElementById("cardNumber").value.trim();
    let fechaVenc = document.getElementById("vencNumber").value.trim();
    let cvv = document.getElementById("cvv").value.trim();
    let yy = document.getElementById("yy").value.trim();

    let cuentaNum = document.getElementById("cuentaNum").value.trim();

    if(tarjetaBanco){
        if(nombreUsu ==="" || numTarjeta ==="" || fechaVenc ==="" || cvv ==="" || yy ===""){
            modal = false;
        }else{
            modal = true;
        }
    }

    if(cuentaBancaria){
        if(cuentaNum ===""){
            modal = false;
        }else{
            modal = true;
        }
    }

    if(formulario && modal){
        swal({
            title: "Grandioso!",
            text: "Has realizado tu compra exitosamente!",
            icon: "https://media.giphy.com/media/Z9WQLSrsQKH3uBbiXq/giphy.gif",
            button: "Genial!",
          });

    }else{
        swal({
            title: "Completa todos los datos!",
            icon: "https://media.giphy.com/media/Kc7qzYMnOTcDb0aEw5/giphy.gif",
            button: "Oh rayos!",
          });
    }



}

function validate(){
    compraButton();
     
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



    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
        })