let carrito = [];


let carritoIcono;
let carritoContador;
let carritoModal;
let carritoItems;
let carritoTotal;


function inicializarCarrito() {

    const carritoGuardado = localStorage.getItem('carritoMercadoVkei');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    

    if (!document.getElementById('carrito-icono')) {
        crearElementosCarrito();
    }

    actualizarCarritoUI();

    asignarEventListeners();
}

function crearElementosCarrito() {

    const navbar = document.querySelector('.navbar .d-flex');
    if (navbar) {
        carritoIcono = document.createElement('div');
        carritoIcono.id = 'carrito-icono';
        carritoIcono.className = 'carrito-icono ms-3';
        carritoIcono.innerHTML = `
            <a href="#" class="position-relative" data-bs-toggle="modal" data-bs-target="#carritoModal">
                <i class="fas fa-shopping-cart fa-lg"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="carrito-contador">0</span>
            </a>
        `;
        navbar.appendChild(carritoIcono);
    }
    

    const modalHTML = `
    <div class="modal fade" id="carritoModal" tabindex="-1" aria-labelledby="carritoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="carritoModalLabel">Tu Carrito de Compras</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="carrito-vacio" class="text-center py-4">
                        <i class="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
                        <p class="text-muted">Tu carrito está vacío</p>
                    </div>
                    <div id="carrito-items" class="d-none">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="carrito-items-body">
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-end">
                            <h4>Total: <span id="carrito-total">$0</span></h4>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Seguir Comprando</button>
                    <button type="button" class="btn btn-primary" id="carrito-finalizar-compra">Finalizar Compra</button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    

    carritoContador = document.getElementById('carrito-contador');
    carritoModal = document.getElementById('carritoModal');
    carritoItems = document.getElementById('carrito-items');
    carritoTotal = document.getElementById('carrito-total');
}


function asignarEventListeners() {

    document.getElementById('carrito-finalizar-compra')?.addEventListener('click', finalizarCompra);

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('eliminar-item')) {
            const id = e.target.dataset.id;
            eliminarDelCarrito(id);
        }
        
        if (e.target.classList.contains('actualizar-cantidad')) {
            const id = e.target.dataset.id;
            const cambio = parseInt(e.target.dataset.cambio);
            actualizarCantidad(id, cambio);
        }
    });
}


function añadirAlCarrito(producto) {

    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {

        productoExistente.cantidad += producto.cantidad || 1;
    } else {

        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: producto.cantidad || 1
        });
    }

    guardarCarrito();
    

    actualizarCarritoUI();
    

    mostrarNotificacion(`${producto.nombre} añadido al carrito`);
}


function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarCarritoUI();
}


function actualizarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad += cambio;
        

        if (producto.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            guardarCarrito();
            actualizarCarritoUI();
        }
    }
}


function guardarCarrito() {
    localStorage.setItem('carritoMercadoVkei', JSON.stringify(carrito));
}


function actualizarCarritoUI() {

    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    if (carritoContador) {
        carritoContador.textContent = totalItems;
    }
    

    if (carritoItems && carritoTotal) {
        const carritoVacio = document.getElementById('carrito-vacio');
        const carritoItemsBody = document.getElementById('carrito-items-body');
        
        if (carrito.length === 0) {
            carritoVacio.classList.remove('d-none');
            carritoItems.classList.add('d-none');
        } else {
            carritoVacio.classList.add('d-none');
            carritoItems.classList.remove('d-none');
            

            carritoItemsBody.innerHTML = carrito.map(item => `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="me-3">
                            <div>${item.nombre}</div>
                        </div>
                    </td>
                    <td>$${item.precio.toLocaleString()}</td>
                    <td>
                        <div class="input-group" style="width: 120px;">
                            <button class="btn btn-outline-secondary actualizar-cantidad" data-id="${item.id}" data-cambio="-1">-</button>
                            <input type="number" class="form-control text-center" value="${item.cantidad}" readonly>
                            <button class="btn btn-outline-secondary actualizar-cantidad" data-id="${item.id}" data-cambio="1">+</button>
                        </div>
                    </td>
                    <td>$${(item.precio * item.cantidad).toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm eliminar-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
            

            const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
            carritoTotal.textContent = `$${total.toLocaleString()}`;
        }
    }
}


function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    

    alert('¡Gracias por tu compra! Serás redirigido al proceso de pago.');
    

    carrito = [];
    guardarCarrito();
    actualizarCarritoUI();
    

    const modal = bootstrap.Modal.getInstance(document.getElementById('carritoModal'));
    modal.hide();
}


function mostrarNotificacion(mensaje) {

    const notificacion = document.createElement('div');
    notificacion.className = 'alert alert-success position-fixed';
    notificacion.style.cssText = 'top: 100px; right: 20px; z-index: 1050; min-width: 300px;';
    notificacion.textContent = mensaje;
    notificacion.setAttribute('role', 'alert');
    
    // Añadir al documento
    document.body.appendChild(notificacion);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Inicializar cuando el DOM esté cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarCarrito);
} else {
    inicializarCarrito();
}


function decreaseQuantity() {
        const quantityInput = document.getElementById('quantity');
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    }

    function increaseQuantity() {
        const quantityInput = document.getElementById('quantity');
        if (parseInt(quantityInput.value) < 10) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }
    }