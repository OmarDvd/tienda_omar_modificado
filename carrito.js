/*preparamos el carrito para poder interaccionar con el*/

function getCarrito(){
    var carritoString = sessionStorage.getItem('carrito');

    //aqui es json
    var carrito = carritoString ? JSON.parse(carritoString) : [];
    return carrito;
}

var carrito=getCarrito();

//aqui es cadena


/*cuando entremos a la pagina carrito queremos ver que en el ul los datos del carrito estén actualizados*/
actualizaCarritoVista();




/*añadimos producto al carrito*/
function anade(id) {
    console.log("entramos");
    /*buscamos si existe o no ya un producto con ese id en el carrito*/
    const index = carrito.findIndex(element => element[0] === id);

    if (index === -1) {
        /*si no existe, lo añadimos*/
        carrito.push([id, 1]);
    } else {
        /*si existe, le añadimos una unidad a la cantidad (segundo elemento del array del elemento en el carrito)*/
        carrito[index][1]++;
        document.getElementById("eliminar").max=carrito[index][1];
    }
    /*actualizamos el carrito en nuestro sessionstorage*/
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    /*actualizamos el valor en el carrito del ul*/
    actualizaCarritoVista();
    /*avisamos al usuario de la accion*/
    alert("produto añadido");



}



function quita(id) {
    console.log("pre "+carrito);
    const index = carrito.findIndex(element => element[0] === id);
    /*buscamos en el carrito la posición el elemento cuyo id coincide con el que queremos eliminar
    con el botón Elimina película, y lo borramos con el slice*/
    carrito.splice(index, 1);

    /*guardamos cambios en el carrito en sesión*/
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
        /*actualizamos ul el carrito*/

    actualizaCarritoVista();

/*eliminamos la película de dom*/
    document.getElementById(`carritoTarjeta${id}`).remove();

    /*si el carrito se queda vacío, que nos lleve a la visión de películas tras pasar 1s*/
    if(carrito.length<1){
        setTimeout(function() {
            window.location.href = 'popular.html';
        }, 1000);

    }



}

/*buscamos el elemento en el carrito en el array con id igual que el que hemos pulsado en el boton
y añadimos una unidad a su cantidad (Segundo elemento del array del elemento)
actualizamos después el carrito en sesión, el ul así como el dom para que se vea el incremento
en el numero de unidades del elemento en cuestión*/

function sumaleUno(id,cantidad=0) {
    const index = carrito.findIndex(element => element[0] === id);
    if(cantidad===1){
        carrito[index][1]+=cantidad;
        document.getElementById("eliminar").max=carrito[index][1];
    }else{
        carrito[index][1]+=parseInt(document.getElementById("cantidad").value);
        document.getElementById("eliminar").max=carrito[index][1];

    }

        

    

    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizaCarritoVista();



    var cantidadH3 = document.getElementById(`cantidadDetalle${id}`);

    var cantidadActual = parseInt(cantidadH3.textContent.split(' ')[1]);

    if(cantidad===1){
        cantidadH3.textContent = `Cantidad: ${cantidadActual + cantidad}`;

    }else{
        cantidadH3.textContent = `Cantidad: ${cantidadActual + parseInt(document.getElementById("cantidad").value)}`;

    }


}



/*restamos una unidades de la cantidad del elemento seleccionado (misma logica de busqueda que antes)
*/

function restaleUno(id,cantidad=0) {
    const index = carrito.findIndex(element => element[0] === id);

    if(cantidad===1){
        if (carrito[index][1] === 1) {
            //si la cantidad antes de borrar es 1, borramos la tarjeta y eliminamos del carrito
            carrito.splice(index, 1);
            document.getElementById(`carritoTarjeta${id}`).remove();
            if(carrito.length<1){
                // document.getElementById("eliminar").max=0;
                /*si ya no hay elementos en el carrito, nos vamos a ver películas tras 1s*/
                setTimeout(function() {
                    window.location.href = 'popular.html';
                }, 1000);
    
            }
    
        } else {
            /*si la cantidad antes de borrar era mayor de 1, solamente tenemos que actualizar el dom con el
            número de unidaees y volver a guardar en el carrito*/
            carrito[index][1]--;
            document.getElementById("eliminar").max=carrito[index][1];

            

            var cantidadH3 = document.getElementById(`cantidadDetalle${id}`);
    
            var cantidadActual = parseInt(cantidadH3.textContent.split(' ')[1]);
        
            
            cantidadH3.textContent = `Cantidad: ${cantidadActual - 1}`;
            document.getElementById("eliminar").value=1;

        }
    }else{
        if(carrito[index][1]===parseInt(document.getElementById("eliminar").value)){
            carrito.splice(index, 1);
            document.getElementById(`carritoTarjeta${id}`).remove();
            if(carrito.length<1){

                /*si ya no hay elementos en el carrito, nos vamos a ver películas tras 1s*/
                setTimeout(function() {
                    window.location.href = 'popular.html';
                }, 1000);
    
            }
    
        }else{
            carrito[index][1]-=parseInt(document.getElementById("eliminar").value);
            document.getElementById("eliminar").max=carrito[index][1];

            var cantidadH3 = document.getElementById(`cantidadDetalle${id}`);
    
            var cantidadActual = parseInt(cantidadH3.textContent.split(' ')[1]);
        
            
            cantidadH3.textContent = `Cantidad: ${cantidadActual - parseInt(document.getElementById("eliminar").value)}`;
            document.getElementById("eliminar").value=1;
           


        }
        
    }

    

    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizaCarritoVista();


}

/*vaciamos carrito, borramos las tarjetas del dom y nos vamos a ver películas*/
function vaciarCarrito() {
    carrito = [];
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizaCarritoVista();

    var tarjetasCarrito = document.querySelectorAll('.carritoTarjeta');

    tarjetasCarrito.forEach(element => element.remove());
    setTimeout(function() {
        window.location.href = 'popular.html';
    }, 1000);

}



/*esta es la función aque actualiza el número de elementos en el botón de acceso al carrito
Esta función se llama cada vez que hacemos una operación del crud de los elementos del carrito*/
function actualizaCarritoVista() {
    var elementos = 0;
    elementos = carrito.length;
    var elementosCarrito = document.querySelectorAll(".botonCarrito");
    elementosCarrito.forEach(element => {
        element.textContent = "Carrito: " + elementos;
    });

    var elementosCarritoUL = document.querySelectorAll(".botonCarritoUL");
    elementosCarritoUL.forEach(element => {
        element.textContent = "Carrito: " + elementos;
    });

    //calcular cantidad para informar al cliente
    calculaTotalCuenta();
    return elementos;

}

// funcion calcular cantidad para informar al cliente
function calculaTotalCuenta(){
    var precioTotal=0;
    carrito.forEach(item => {
        precioTotal+=item[1];
    });
    document.getElementById("precioTotal").textContent=precioTotal;
}




/*función asociada al botón que pone carrito acompañado con el número de productos distintos en él
(la cantidad no representa la totalidad de unidades porque hemos querido hacerlo así)*/
function vercarrito() {
    window.location.href = 'carrito.html';
}


/*comprar vacia el carrito tras 1s*/

function comprar() {
    // realmente solo añade un segundo más a vaciarCarrito()

    setTimeout(function() {
        vaciarCarrito();
    }, 1000);
}







/*Cerrar sesión seteando las variables a vacio y la llave a false. Además avisamos del cierre de sesión y nos vamos para el login principal*/

function cerrarSesion(){
let confirmar=confirm("¿Seguro que quieres cerrar sesión? Se borrarán todos los productos guardados en los que estás interesado")
if(confirmar){
    sessionStorage.setItem('username', '');

    sessionStorage.setItem('email', '');
    sessionStorage.setItem('llave', false);
    
    sessionStorage.setItem('carrito', []);
    alert("Has cerrado sesión");
        window.location.href = 'index.html';
        
}
	

}





















