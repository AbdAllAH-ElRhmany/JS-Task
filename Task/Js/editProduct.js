let productName = document.querySelector('#product-name');
let productDesc = document.querySelector('#product-desc');
let productSize = document.querySelector('#filter');
let updateBtn = document.querySelector('#updateBtn');
let uploadImg = document.querySelector('#upload-img');


let products =JSON.parse( localStorage.getItem('products')) || data;

let productId = JSON.parse(localStorage.getItem('editProductId')) ;





let selectedProduct = products.find((i)=>{
    return i.id ===productId});
console.log(selectedProduct);


productDesc.value = selectedProduct.desc;
productName.value= selectedProduct.title;
productSize.value = selectedProduct.size;
productImage = selectedProduct.imageUrl;

updateBtn.addEventListener('click', updateProduct);
 uploadImg.addEventListener('change', getImage);

function updateProduct(e){
    e.preventDefault();
    selectedProduct.desc = productDesc.value;
    selectedProduct.title = productName.value;
    selectedProduct.size = productSize.value;
    selectedProduct.imageUrl = productImage;
    localStorage.setItem('products',JSON.stringify(products));
    alert('Product Updated');
}


function getImage(){
    let file = this.files[0];
    let types = ["image/jpeg", "image/png","image/jpg"]
    if(types.indexOf(file.type) ==-1){
        alert("Type Not Support..");
        return;
    }
    if(file.size> 2* 1024 *1024){
        alert("Image Not Exced 2MG");
        return;
    }
    getImageBase64(file);
}


function getImageBase64(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(){
        productImage = reader.result;
    };
    reader.onerror = function(){
        alert("Error...");
    };
}

