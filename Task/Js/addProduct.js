let productName = document.querySelector('#product-name');
let productDesc = document.querySelector('#product-desc');
let productSize = document.querySelector('#filter');
let createBtn = document.querySelector('#createBtn');
let uploadImg = document.querySelector('#upload-img');

let productImage;
createBtn.addEventListener('click', craeteNewProduct);
uploadImg.addEventListener('change', getImage);

function craeteNewProduct(e) {
	e.preventDefault();
	let allProducts = JSON.parse(localStorage.getItem('products')) || data;
	let nameValue = productName.value;
	let descValue = productDesc.value;
	let productSizeValue = productSize.value;
	if (nameValue && descValue && productSizeValue) {
		let obj = {
			id: allProducts ? allProducts.length + 1 : 1,
			imageUrl: productImage,
			title: nameValue,
			desc: descValue,
			size: productSizeValue,
			byMe: 'y',
		};
		let newProducts = allProducts ? [...allProducts, obj] : obj;
        localStorage.setItem('products', JSON.stringify(newProducts));
        alert('Product Added');
		productName.value = '';
		productDesc.value = '';
		productSize.value = '';
	} else {
		alert('Enter Data ....');
	}
}

function getImage() {
	let file = this.files[0];
	let types = ['image/jpeg', 'image/png', 'image/jpg'];
	if (types.indexOf(file.type) == -1) {
		alert('Type Not Support..');
		return;
	}
	if (file.size > 2 * 1024 * 1024) {
		alert('Image Not Exced 2MG');
		return;
	}
	getImageBase64(file);
}

function getImageBase64(file) {
	let reader = new FileReader();
	reader.readAsDataURL(file);

	reader.onload = function () {
		productImage = reader.result;
	};
	reader.onerror = function () {
		alert('Error...');
	};
}
