/*tanto en populares.html como en carrito.html,
si la llave no es true, es porque no ha habido token de identificacion de vuelta a la peticion de logeo
contra la api de la fakestore, por tanto, nos lleva de nuevo al login que el index.html. Si es true la llave
entonces guardamos el nombre de usuario y lo mostramos en la barra de navegacion de nuestras paginas, en el li con clase nonbreUsuario*/

//para evitar que existiendo el token, podamos entrar habiendo deslogeado en populares.html, le decimos que tiene que existir también username
// si no, nos vamos al index. Esto es para logearnos por segunda vez sin haber cerrado el navegador. Así no podemos entrar nunca sin logearnos

function comprobarAcceso(){

    if (!sessionStorage.getItem('llave')) {
        alert("debes logearte");
        window.location.href = 'index.html';
    } else {
        if(!sessionStorage.getItem('username')){
            alert("debes logearte");
            window.location.href = 'index.html';
        }else{
            console.log(sessionStorage.getItem('username'));
            var elementos = document.querySelectorAll(".nombreUsuario");
        
            elementos.forEach(element => {
                element.textContent = sessionStorage.getItem('username');
            });
        }
        
    
    }
    
}

comprobarAcceso();








