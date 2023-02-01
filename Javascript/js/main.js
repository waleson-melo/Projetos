var flagGetAllProduct = false

try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id != null) {
        const url = "https://dummyjson.com/products/" + id
        getProductByID(url)
    } else {
        flagGetAllProduct = true
    }
} catch (error) {
    // console.log(error)
}

if (flagGetAllProduct) {
    getAllProducts("https://dummyjson.com/products?limit=12")
}

function searchButton() {
    let selecteCate = document.querySelector(".search-cate")
    let selectedOption = selecteCate.options[selecteCate.selectedIndex].text
    let searchInput = document.querySelector(".search-input")

    if (searchInput.value == "") {
        switch (selectedOption) {
            case "Todos":
                getAllProducts("https://dummyjson.com/products?limit=9")
                break;

            default:
                getAllProducts("https://dummyjson.com/products/category/" + selectedOption)
                break;
        }
    } else {
        getAllProducts("https://dummyjson.com/products/search?q=" + searchInput.value)
    }
}

async function getAllProducts(url) {
    const response = await fetch(url)
    const products = await response.json()
    let divProducts = document.querySelector(".products")
    divProducts.innerHTML = ""

    if (products['products'].length > 0) {
        products['products'].map((product) => {
            let elementCard = " \
            <a href='?id=" + product.id + "'> \
            <div class='product-card'> \
                <img src='" + product.thumbnail + "' alt=''> \
                <a href=''>" + product.title + "</a> \
                <div class='product-price'> \
                    <p>R$ " + product.price + "</p> \
                </div> \
            </div> \
            </a>"

            divProducts.insertAdjacentHTML("beforeend", elementCard)
        })
    } else {
        divProducts.insertAdjacentHTML("beforeend", "<h1>Elemento nao encontrado :(</h1>")
    }
}

async function getProductByID(url) {
    const response = await fetch(url)
    const product = await response.json()

    let divProducts = document.querySelector(".only-product")
    divProducts.innerHTML = ""
    divProducts.classList.remove("only-product-hide")
    divProducts.classList.add("only-product-show")
    console.log(product)
    let element_card = " \
        <a href='?'>Voltar</a> \
        <img src='" + product.thumbnail + "' alt=''> \
        <div class='product-description'> \
        <h1 class='title'>" + product.title + "</h1> \
            <p class='price'>R$ " + product.price + "</p> \
        </div> \
        <p>" + product.description + "</p>"
    divProducts.insertAdjacentHTML("beforeend", element_card)
}
