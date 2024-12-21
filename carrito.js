document.addEventListener("DOMContentLoaded", () => { 
    const carritoContainer = document.getElementById("carrito-container"); 
    const totalElement = document.getElementById("total"); 
    

    



    function cargarCarrito() { 
        let cart = JSON.parse(localStorage.getItem("cart")) || []; 
        carritoContainer.innerHTML = ""; 
        let total = 0; 
        
        cart.forEach((product) => { 
            const productRow = document.createElement("tr"); 
            productRow.innerHTML = ` 
                <td>${product.title}</td> 
                <td>$${product.price.toFixed(2)}</td> 
                <td>1</td> 
                <td><button class="btn btn-danger eliminar-producto" data-id="${product.id}">Eliminar</button></td>
                <td>$${product.price.toFixed(2)}</td> <!-- Subtotal al final --> 
            `; 
            
            carritoContainer.appendChild(productRow); 
            total += product.price; 
        });

        totalElement.textContent = total.toFixed(2);  

        // Evento click para los botones de eliminar //
        document.querySelectorAll(".eliminar-producto").forEach(button => { 
            button.addEventListener("click", (event) => { 
                const productId = event.target.getAttribute("data-id"); 
                eliminarDelCarrito(productId); 
            }); 
        });
    }
    //botón de volver a la seccion de productos/gabinetes
    document.getElementById("volver-productos").addEventListener("click", ()=>{
        window.location.href="productos1.html";
    })

    //botón de finalizar compra
    document.getElementById("finalizar-compra").addEventListener("click", () => { 
        alert("Compra finalizada. Total: $" + totalElement.textContent); 
        localStorage.removeItem("cart"); 
        cargarCarrito(); 
    }); 
    cargarCarrito(); 
});