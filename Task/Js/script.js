let productsDom = document.querySelector(".products");
let products = data;



let drawProductsUI;
(drawProductsUI = function (products = []) {
    let UI = products.map((item) => {
        return `
        <div class="product-item">
            <img src="${item.imageUrl}" alt="" class="product-item-img w-100">
            <div class="product-item-info">
                <h2 class="product-item-title">${item.title}</h2>
                <p class="product-item-desc">${item.desc}</p>
                <span class="product-item-price d-block mb-2">Size: ${item.size}</span>
                <button class="btn btn-dark" onclick="editProduct(${item.id})" style="display:${item.byMe==='y'? 'block': 'none'}" >Edit Product</button>
            </div><!-- ./product-item-info -->
        </div><!-- ./product-item -->
        `;
    });
    productsDom.innerHTML = UI.join("");
})(JSON.parse(localStorage.getItem('products')) || products);

/////////////////////////////////////////

let searchBtn = document.querySelector("#search");

searchBtn.addEventListener("keyup", search);


function search(){
    products = JSON.parse(localStorage.getItem('products'))? JSON.parse(localStorage.getItem('products')) : products;
    let title = searchBtn.value.trim();
    let selected =  products.filter(item => {
        return item.title.toLowerCase().indexOf(title.toLowerCase()) !==-1 || item.id==title;
    });
    drawProductsUI(selected);
}

////////////////////////////////////////////


let filterBtn = document.querySelector("#filter");

filterBtn.addEventListener('change', filterProducts);

function filterProducts(e) {
    let size = e.target.value;
    if(size === 'all'){
        drawProductsUI(products);
    } else {
        let selected = products.filter(item => {
            return item.size === size;
        });
        drawProductsUI(selected);
    }
}

//////////////////////////////////////

function editProduct(id){
    localStorage.setItem('editProductId', id)
    window.location.assign("editproduct.html");
}
