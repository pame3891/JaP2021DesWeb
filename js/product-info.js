//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


let producto = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            producto = resultObj.data;

            let productoName = document.getElementById("auto");
            let productoDescription = document.getElementById("descripcion");
            let productoCost = document.getElementById("costo");
            let productoSoldCount = document.getElementById("vendidos");
            let productoRelated = document.getElementById("relacionado");
           // let productoImagen = document.getElementById ("productImagesGallery");

            productoName.innerHTML = `<i class="fas fa-car-side"></i>` + producto.name + `<i class="fas fa-car-side"></i>`;
            productoDescription.innerHTML = producto.description;
            productoCost.innerHTML = producto.currency + " " + producto.cost;
            productoSoldCount.innerHTML = producto.soldCount;
            productoRelated.innerHTML = relacionados(producto.relatedProducts);
            showImagesGallery(producto.images);

            
            

        }
    })

});




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            mostrarComentarios(comentarios);
           
        }
    });
    
});




function showImagesGallery(array){  
    var array = producto.images;                                         
    var slides = "";

  // array.forEach( element => {
    for (let i=0; i< array.length; i++) {
        
        element = array[i];
      

    if(i==0){
        slides += "<div class='carousel-item active'><img src=" + element + " class='d-block w-100' alt='...'></div>"
        continue;
    }else{
        slides += "<div class='carousel-item'><img src=" + element + " class='d-block w-100' alt='...'></div>"
    }
       
   }
   document.getElementById("productImagesGallery").innerHTML=slides;
   };





function relacionados(productoRelated){
    getJSONData(PRODUCTS_URL).then(function (responseObj) {
        if (responseObj.status === "ok") {
            relatedObj = responseObj.data;

            let htmlRelatedToAppend = "";  

    for (let i=0; i< productoRelated.length; i++) {
        
         relacionado = productoRelated[i];
        prodRelated = relatedObj[relacionado];
        

    htmlRelatedToAppend += `
      
                    <div class="col-3">
                        <img src=" ${prodRelated.imgSrc} " alt="${prodRelated.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h3 class="mb-1">${prodRelated.name}</h4>
                        </div><br>
                        <p class="mb-1">${prodRelated.description}</p><br>
                        <h4> ${prodRelated.currency} ${prodRelated.cost}</h3>
                    </div>
               
     `//poner info del JSon

     document.getElementById("relacionado").innerHTML = htmlRelatedToAppend;
        
     //relacionados(producto.relatedProducts);
     }
        }
        });
    }
 
    
function mostrarComentarios(array) {

    let htmlContentToAppend = "";
    //htmlContentToAppend += `<div class="list-group"`;

    for (let i = 0; i < array.length; i++) {
        let comments = array[i];
        let estrellas = "";
       
        for(let i=1; i<=5; i++){

            if (i<=comments.score){
                estrellas += `<i class="fas fa-trophy fa-2x"></i>`;

            }else {
                estrellas += `<i class="fas fa-sad-tear fa-2x"></i>`;
            }
            
        }
        
        

            htmlContentToAppend += `

              
        <div class="list-group-item list-group-item-action flex-column align-items-start ">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1"><b>`+ comments.user +`</b> </h5>
          <small>` + comments.dateTime + `</small>
        </div>
        <small>` + estrellas + `</small>
        <p class="mb-1">` + comments.description + `</p>
             </div>
            `
        }
        htmlContentToAppend += `</div>`;
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    };

  
    function califico(num){
      num = "";
       let estrellas = "";
       for (let i=1; i<=5; i++){
           if (i<=num){
               estrellas +=`<ion-icon name="flower-outline"onclick="calificar(`+i+`)"></ion-icon>`;//<i class="fas fa-lightbulb" onclick="calificar(`+i+`)"><i>
           }else{
               estrellas +=`<i class="far fa-lightbulb" onclick="calificar(`+i+`)"><i>`; 
           }
       }
       
       return estrellas;
    }


function comentar() {
    comment = {};
    comment.description= document.getElementById('comment').value;
    comment.score= parseInt(document.getElementById('valor').innerHTML);
    let usuarioActual = JSON.parse(localStorage.getItem("usuario"));//localStorage.setItem('usuario',JSON.stringify(usuario.nombre));
    comment.user = usuarioActual.nombre;

    var fecha = new Date();
    var año = fecha.getFullYear();
    var mes = fecha.getMonth() +1;
    var dia = fecha.getDate();
    var hora = fecha.getHours();
    var minuto = fecha.getMinutes();
    var segundo = fecha.getSeconds();

   
    if(comment.user =="" || comment.description == ""){

        msj.innerHTML= "Debes loguearte para comentar";
        msj.style.color="blue";
        msj.style.display="block";


    }else{
       
       console.log(comment.user);
        
        document.getElementById('comment').value="";

        temp = año;
        temp += ((mes < 10) ? '-0' : '-') + mes;
        temp += ((dia < 10) ? '-0' : '-') + dia;
        temp += " ";
        temp += ((hora < 10) ? '-0' : ':') + hora;
        temp += ((minuto < 10) ? '-0' : ':') + minuto;
        temp += ((segundo < 10) ? '-0' : ':') + segundo;
    

    comment.dateTime = temp;
   
    comentarios.push(comment);
    mostrarComentarios(comentarios);
}
}



/*const ORDER_BY_ASC_STAR = "Mas puntos";
const ORDER_BY_DESC_STAR = "Menos puntos";

function sortByStars(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_ASC_STAR) {
        result = array.sort(function (a, b) {
            let aStar = parseInt(a.score);
            let bStar = parseInt(b.score);

            if (aStar < bStar) { return -1; }
            if (aStar > bStar) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_DESC_STAR) {
        result = array.sort(function (a, b) {
            let aStar = parseInt(a.score);
            let bStar = parseInt(b.score);

            if (aStar > bStar) { return -1; }
            if (aStar < bStar) { return 1; }
            return 0;
        });

}
return result;
}

function ordenaYMuestraStar(sortCriteria, productArray) {
    currentSortCriteria = sortCriteria;

    if (productArray != undefined) {
        currentProductArray = productArray;
    }

    array = sortByStars(currentSortCriteria, currentProductArray);

    //Muestro los productos ordenados
    mostrarComentarios(currentProductArray);
}

document.getElementById("maspuntos").addEventListener("click", function () {
    ordenaYMuestraStar(ORDER_BY_ASC_STAR);
});

document.getElementById("menospuntos").addEventListener("click", function () {
    ordenaYMuestraStar(ORDER_BY_DESC_STAR);
});*/


function desconectar(){
    localStorage.clear();
    location.href="login.html";
    signOut();  }

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
 