/* Variable used a lot */
var cartArray = []
var searchArray = []
var products_;
// -------------------------------------------------------

/* get the products */
fetch('products.json')
    .then(function (response) {
        response.json()
            .then(function (products) {
                /* connect products to other parts of the program */
                products_ = products
                /* display the product */
                products.forEach(product => {
                    switch (product.category) {
                        case 'clothing':
                            var clothesShelf = document.getElementById('clothesShelf')
                            clothesShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'electronics':
                            var electronicsShelf = document.getElementById('electronicsShelf')
                            electronicsShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'groceries':
                            var groceriesShelf = document.getElementById('groceriesShelf')
                            groceriesShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'furniture':
                            var furnitureShelf = document.getElementById('furnitureShelf')
                            furnitureShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'beauty':
                            var beautyShelf = document.getElementById('beautyShelf')
                            beautyShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'outdoors':
                            var outdoorsShelf = document.getElementById('outdoorsShelf')
                            outdoorsShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'books':
                            var booksShelf = document.getElementById('booksShelf')
                            booksShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'books':
                            var booksShelf = document.getElementById('booksShelf')
                            booksShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'automotive':
                            var automotivesShelf = document.getElementById('automotivesShelf')
                            automotivesShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'office':
                            var officesShelf = document.getElementById('officesShelf')
                            officesShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;
                        case 'holiday':
                            var holidaysShelf = document.getElementById('holidaysShelf')
                            holidaysShelf.innerHTML += arrangeProductsInShelf(product.price, product.name, product.description, product.id, product.image_path)
                            break;

                    }
                });
            })
    })

function checkOut(event){
    alert('End of Demostration')
}

/* handle input */
function handleInput(event) {
    /* search products */
    if (!products_) {
        alert('products havent been loaded, please hold')
        return
    }

    var searchTerm = event.target.value

    searchArray = []

    products_.forEach(product => {
        /* no starting white spaces */
        if (!/^\s+/.test(searchTerm)) {
            /*search  */
            for (var i = 0; i < product.search_terms.length; i++) {
                var regex = new RegExp(`\\b${product.search_terms[i]}\\b`)
                
                if (product.name.includes(searchTerm) ||
                    product.description.includes(searchTerm) ||
                    product.category.includes(searchTerm) ||
                    regex.test(searchTerm)) {
                    searchArray.push(product);
                    break;
                }
            }
        }
    })

    /* display search term in element */
    var searchTermElement = document.getElementById('searchTermElement')
    searchTermElement.innerText = searchTerm

    /* show search box */
    var searchResultBox = document.getElementById('searchResultBox')
    searchResultBox.style.display = 'block';

    /* toggle main content */
    var mainContent = document.getElementById('mainContent')
    if (searchTerm == '') {
        searchArray = []
        var searchResultBox = document.getElementById('searchResultBox')
        searchResultBox.style.display = 'none';
        mainContent.style.display = 'block'
    } else {
        mainContent.style.display = 'none'
    }

    /* show search number */
    var numOfResult = document.getElementById('numOfResult')
    numOfResult.innerText = searchArray.length;

    /* unpack search array and display */
    var html = '';
    searchArray.forEach(searchProduct => {
        html += arrangeProductsInShelf(searchProduct.price, searchProduct.name, searchProduct.description, searchProduct.id, searchProduct.image_path)
    })

    var searchDisplay = document.getElementById('searchDisplay')
    searchDisplay.innerHTML = html
}

/* scrolling */
const scrollSpeed = 400
function moveRight(event) {
    /* scroll shelf right */
    var cardDisplay = event.target.parentElement.children[2]
    if (cardDisplay.scrollLeft < cardDisplay.scrollWidth) {
        cardDisplay.scrollLeft += scrollSpeed
    }
}

function moveLeft(event) {
    /* scroll shelf left */
    var cardDisplay = event.target.parentElement.children[2]
    if (cardDisplay.scrollLeft > 0) {
        cardDisplay.scrollLeft -= scrollSpeed
    }
}

/* view cart */
function viewCart(event) {
    var invoice = document.getElementById('invoice')
    invoice.style.transform = 'translateX(0)'
    event.target.style.display = 'none'
    var hideCart = document.getElementById('hideCart')
    hideCart.style.display = 'inline-block'
    unpackCart()
}

/* hide cart 1 */
function hideCart(event) {
    var invoice = document.getElementById('invoice')
    invoice.style.transform = 'translateX(-150%)'
    event.target.style.display = 'none'
    // var viewCart = document.getElementById('viewCart')
    // viewCart.style.display = 'inline-block'

}

/* hide cart 2 */
function hideCart2(event) {
    var invoice = document.getElementById('invoice')
    invoice.style.transform = 'translateX(-150%)'
    event.target.style.display = 'none'
    var viewCart = document.getElementById('viewCart')
    viewCart.style.display = 'inline-block'
    document.getElementById('hideCart').style.display = 'none'
}

/* add to cart */
function addToCart(event) {
    if (!products_) {
        alert('products hasnt been loaded')
        return
    }
    /* get carted product id */
    var selectedProductID = parseInt(event.target.parentElement.children[4].value);

    products_.forEach(function (product) {
        if (product.id == selectedProductID) {
            /* if there is a duplicate */
            if (cartArray.filter(carted_product => carted_product.id == selectedProductID).length > 0) {
                cartArray.forEach(carted_product => {
                    if (selectedProductID == carted_product.id) {
                        carted_product.units += 1
                    }
                })
            } else {
                /* if there is no duplicate */
                cartArray.push(
                    {
                        id: product.id,
                        name: product.name,
                        units: 1,
                        price: product.price,
                        image_path: product.image_path
                    }
                )
                /* update number or items in cart */
                document.dispatchEvent(updateCartSize);
            }
        }
    })

    unpackCart()
}

/* add unit */
function addUnit(event) {
    var productId = parseInt(event.target.parentElement.children[4].value)
    // console.log(productId)
    cartArray.forEach(carted_product => {
        if (carted_product.id == productId) {
            carted_product.units += 1
        }
    })

    unpackCart()
}
/* minus unit */
function minusUnit(event) {
    var productId = parseInt(event.target.parentElement.children[4].value)
    // console.log(productId)
    cartArray.forEach(carted_product => {
        if (carted_product.id == productId) {
            if (carted_product.units > 1) {
                carted_product.units -= 1
            }
        }
    })

    unpackCart()
}

/* remove unit */
function removeProduct(event) {
    var productId = parseInt(event.target.parentElement.parentElement.children[1].children[4].value)
    // console.log(productId)
    cartArray = cartArray.filter(carted_product => {
        return (
            carted_product.id !== productId
        )
    })
    document.dispatchEvent(updateCartSize)

    if (cartArray.length < 1) {
        var viewCart = document.getElementById('viewCart')
        viewCart.style.display = 'none'
        var hideCart = document.getElementById('hideCart')
        hideCart.click()
    }

    unpackCart()
}

/* clear cart */
function clearCart() {
    cartArray = []
    document.dispatchEvent(updateCartSize)
    var hideCart = document.getElementById('hideCart')
    hideCart.style.display = 'none'
    var invoice = document.getElementById('invoice')
    invoice.style.transform = 'translateX(-150%)'
}

// -------------------------------------------------------
/* once script starts running */
window.onload = () => {
    document.dispatchEvent(updateCartSize)
}

/* create cart array should be updated event */
var updateCartSize = new Event('updatecartsize');
document.addEventListener('updatecartsize', () => {
    document.getElementById('cartNumber').innerText = cartArray.length

    var viewCart = document.getElementById('viewCart')
    var clearCart = document.getElementById('clearCart')
    if (parseInt(document.getElementById('cartNumber').innerText) < 1) {
        viewCart.style.display = 'none'
        clearCart.style.display = 'none'
    } else {
        viewCart.style.display = 'inline-block'
        clearCart.style.display = 'inline-block'
    }
})

/* arrrange products into the shelf */
function arrangeProductsInShelf(price, name, description, id, imagepath) {
    return (
        `
        <div class="product-card">
            <div class="details">
                <h1>&euro; ${price}</h1>
                <h2>${name}</h2>
                <p>${description}</p>
                <button onclick="addToCart(event)">Add to cart</button>
                <input type="hidden" value="${id}">
            </div>
            <img src="${imagepath}" alt="" width="200" height="200">
        </div>
        `
    )
}

function unpackCart() {
    /* unpack cartArray */
    var html = `
        <h1 class="header">Cart</h1>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Units</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
    `
    var prices = []
    cartArray.forEach((carted_product) => {
        // store prices in array
        prices.push((carted_product.price * carted_product.units).toFixed(2))
        html += `
                <tr>
                    <td><img src="${carted_product.image_path}" alt="" width="50" height="50"> <div class="cart-product-name">${carted_product.name}</div></td>
                    <td><span>${carted_product.units}</span><br><button class="add" id="addUnit" onclick="addUnit(event)">&plus;</button> <button class="minus" id="minusUnit" onclick="minusUnit(event)">&minus;</button><input type="hidden" value="${carted_product.id}"></td>
                    <td class="price-box">&euro; ${(carted_product.price * carted_product.units).toLocaleString()}</td>
                    <td><button class="remove-product" id="removeProduct" onclick="removeProduct(event)">&times;</button></td>
                </tr>
        `
    })
    var sum = 0.0
    prices.forEach((price) => {
        sum += parseFloat(price)
    })
    html += `
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="2">Total</th>
                    <th>&euro; ${sum.toLocaleString()}</th>
                </tr>
            </tfoot>
        </table>
        <div class="invoice-btn-container">
            <button class="check-out-btn check-out" onclick="checkOut(event)">Check out</button><button class="check-out-btn hide-cart-btn" onclick="hideCart2(event)">Hide cart</button>
        </div>
    `
    invoice.innerHTML = html

}
