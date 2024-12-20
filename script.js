//-------------------------------------------------------------------------------
//Vamos a traer una lista de prodcutos desde una API y los vamos a imprimir en cards
//de nuestra página poniendo un límite de 20 productos. También agregamos los productos
//que el usuario seleccione al carrito de compras usando localStorage.
//-------------------------------------------------------------------------------

//cargamos el DOM antes de ejecutar el código de la función
document.addEventListener("DOMContentLoaded", () => {
    //con getElemenById seleccionamos el contenedor de productos del html. Allí se mostrarán
    //los productos
    const productosContainer = document.getElementById("productos-container");

    function fetchProductos() { //desde aquí hacemos solicitud a la API
        //'limit=20 dice el límite de productos que traeremos desde es API
        fetch("https://dummyjson.com/products?limit=20")
            .then((response) => response.json()) //la respuesta de la API se convierte en archivo JSON
            //aquí dentro trabajaremos con la lista de productos
            .then((data) => { //el parametro data representa al objeto JSON
                //la lista de productos del objeto data se asigna a la constante productos,
                //ahora se puede trabajar con cada producto en forma individual
                const productos = data.products;

              // Limpiamos el contenedor de productos para que no haya duplicados cada vez que se 
              // llama a la función
                productosContainer.innerHTML = "";

              // Generamos las cards de productos para cada elmento del array 
                productos.forEach((product) => { //iteramos sobre cada elem,ento de la lista productos. prodcut es cada uno de ellos, uno por vez
                    const cardDiv = document.createElement("div");//creamos un div para cada card de cada prooducto
                    cardDiv.className = "col-md-4"; //le asignamos al div esta clase de bootstrap

                    //con innerHTML asignamos el contenido html de cada tarjeta a cardDiv.
                    //todo lo que esté dentro de '' va a ser el contenido html del div creado  
                    //se va cargando en cada card los campos propios de cada elemento de la lista (imagen, nombre, descropción, precio)
                    cardDiv.innerHTML = `
                        <div class="card mt-3" style="width: 15rem;">
                            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text fw-bold">Precio: $${product.price}</p>
                                <a href="#" class="btn btn-success mt-auto">Agregar</a>
                            </div>
                        </div>
                    `;

                    // Agregamos evento al botón "Agregar"
                    //seleccionamos el botón de cada card y añadimos el evento click que llama a la función
                    //agregarAlCartito pasandole como parámetro el producto donde está el botón
                    //event.preventDefault se usa para evitar la accion predeterminada del enlace de conducirnos a otra pag  
                    const botonAgregar = cardDiv.querySelector("a");
                    botonAgregar.addEventListener("click", (event) => {
                        event.preventDefault();
                        agregarAlCartito(product);
                    });

                    // Ya creada la card (contenida en el div cardDiv), la agregamos al contenedor de productos en el DOM
                    productosContainer.appendChild(cardDiv);
                });
            })
            .catch((error) => console.error("Error", error));
    }

    // Función para agregar al carrito usando localStorage
    //el parametro product es el producto que queremos añadir al carro
    function agregarAlCartito(product) {
        //se busca obtener el carrito guardado en localStorage con la clave cart. Si no existe, crea un array vacío
        //JSON.parse convierte la cadena de texto guardada en localStorage en un objeto JS
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);//se guarda ese producto al final del array cart
        
        //JSON.stringify(cart) convierte el objeto cart otra vez a texto para almacenarlo en localStorage
        //localStorage.setItem guarda esa cadena de texto en localS con la clave cart. Sobreescribe lo que esté ya guardado.
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.title} ha sido agregado al carrito!`);//msj de alerta en el navegador
    }

    // Carga inicial de productos
    fetchProductos();
    
});