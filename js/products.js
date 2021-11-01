const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_REL = "Relevancia";
const ORDER_BY_ASC_COST = "Precio asc";
const ORDER_BY_DESC_COST = "Precio desc";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minimo = undefined;
var maximo = undefined;

function sortProduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) 
    {
        result = array.sort(function (a, b) {

            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        }); 
    }else if (criteria === ORDER_BY_REL) {
        result = array.sort(function (a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if (aSoldCount > bSoldCount) { return -1; }
            if (aSoldCount < bSoldCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_ASC_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost < bCost) { return -1; }
            if (aCost > bCost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_DESC_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost > bCost) { return -1; }
            if (aCost < bCost) { return 1; }
            return 0;
        });


    }
    return result;
}

function showProductList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minimo == undefined) || (minimo != undefined && parseInt(product.cost) >= minimo)) &&
            ((maximo == undefined) || (maximo != undefined && parseInt(product.cost) <= maximo))) {

            htmlContentToAppend += `
            <div class="col-md-4 col-lg-5" id="estilo">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">

                <img src="${product.imgSrc}" class="card-img-top" alt="${product.description}">
                <div class="card-body">
                    <h3 class="mb-3">${product.name}</h3>
                        <h6 class="card-subtitle mb-2 text-muted">${product.cost} ${product.currency}</h6>
                            <p class="card-text">
                                ${product.description}
                             </p>
                </div>
            </a>
        </div>
            
            `
        }

        document.getElementById("product-list").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProduct(sortCriteria, productArray) {
    currentSortCriteria = sortCriteria;

    if (productArray != undefined) {
        currentProductArray = productArray;
    }

    array = sortProduct(currentSortCriteria, currentProductArray);

    //Muestro los productos ordenados
    showProductList(currentProductArray);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProduct(ORDER_ASC_BY_NAME, resultObj.data);
           
        }
    });

    document.getElementById("Nameasc").addEventListener("click", function () {
        sortAndShowProduct(ORDER_ASC_BY_NAME);
    });

    document.getElementById("Namedesc").addEventListener("click", function() {
        sortAndShowProduct(ORDER_DESC_BY_NAME);
    });

    document.getElementById("rel").addEventListener("click", function () {
        sortAndShowProduct(ORDER_BY_REL);
    });

    document.getElementById("ascendente").addEventListener("click", function () {
        sortAndShowProduct(ORDER_BY_ASC_COST);
    });

    document.getElementById("descendente").addEventListener("click", function () {
        sortAndShowProduct(ORDER_BY_DESC_COST);
    });

    /*document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });*/

    document.getElementById("minimo").addEventListener("keyup", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minimo = document.getElementById("minimo").value;


        if ((minimo != undefined) && (minimo != "") && (parseInt(minimo)) >= 0) {
            minimo = parseInt(minimo);
        }
        else {
            minimo = undefined;
        }


        showProductList(currentProductArray);
    });
    document.getElementById("maximo").addEventListener("keyup", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        maximo = document.getElementById("maximo").value;


        if ((maximo != undefined) && (maximo != "") && (parseInt(maximo)) >= 0) {
            maximo = parseInt(maximo);
        }
        else {
            maximo = undefined;
        }

        showProductList(currentProductArray);
    });
});

let filteredArray = [];

function search() {

    let input = document.getElementById('searchBar').value;

    let filteredArray = currentProductArray.filter(product => {
        return product.name.toLowerCase().indexOf(input.toLowerCase()) > -1; //|| product.description.toLowerCase().indexOf(input.toLowerCase()) 
    });

    showProductList(filteredArray);

}
document.getElementById("searchBar").addEventListener("keyup", () => {
    search();
})

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

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu(){
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu(){
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}