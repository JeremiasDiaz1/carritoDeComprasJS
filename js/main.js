const aniadirProducto = document.querySelectorAll('.addToCart')

aniadirProducto.forEach((botonAniadir) => {
    botonAniadir.addEventListener('click', addClick)
})

const carritoDeCompras = document.querySelector('.shoppingCartItemsContainer')


function addClick (event) {
    const button = event.target
    const item = button.closest('.item')

    const itemTitulo = item.querySelector('.item-title') .textContent
    const itemImagen = item.querySelector('.item-imagen') .src
    const itemPrecio = item.querySelector('.item-precio') .textContent

    aniadirProductoAlCarro(itemTitulo, itemPrecio, itemImagen)

    localStorage.setItem('producto', JSON.stringify({itemTitulo, itemPrecio, itemImagen}))

}

function aniadirProductoAlCarro(itemTitulo, itemPrecio, itemImagen) {
    const carrito = document.createElement('div')
    const elementoCarrito = `
    <div class="row shoppingCartItem">
                    <div class="col-6">
                        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <img src=${itemImagen} class="shopping-cart-image">
                            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitulo}
                            </h6>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <p class="item-price mb-0 shoppingCartItemPrice">${itemPrecio}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div
                            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                                value="1">
                            <button class="btn btn-danger buttonDelete" type="button">X</button>
                        </div>
                    </div>
                </div>`
     
    carrito.innerHTML = elementoCarrito
    carritoDeCompras.append(carrito)

    carrito.querySelector('.buttonDelete').addEventListener('click', removerDelCarrito)


    sumadorCarrito ()
}

function sumadorCarrito () {
    let total = 0
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal')

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem')
    
    shoppingCartItems.forEach( shoppingCartItem => {
        const totalCarritoDeCompras = shoppingCartItem.querySelector('.shoppingCartItemPrice')
        
        const shoppingCartItemPrice = Number(totalCarritoDeCompras.textContent.replace('$',''))
        
        const cantidadDeElementos = shoppingCartItem.querySelector('.shoppingCartItemQuantity')

        const shoppingCartItemQuantity = Number(cantidadDeElementos.value)
        
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity

    })
    
    shoppingCartTotal.innerHTML = `${total}$`;
}

function removerDelCarrito (event) {
    const buttonClicked = event.target 
    buttonClicked.closest('.shoppingCartItem').remove()
    sumadorCarrito ();
}

// guardado en localStorage

function cargarCarrito() {
   const miProducto = JSON.parse(localStorage.getItem('producto'))
   aniadirProductoAlCarro(miProducto.itemTitulo, miProducto.itemPrecio, miProducto.itemImagen)

    
}

window.onload = function() {
    cargarCarrito();
    
  }
// debugger;
