// slider

const slides = document.querySelectorAll('.slide_pic');
const slideNavs = document.querySelectorAll('.slider-controls .radio');
let interval;
let currentSlide = 0;

function init(){
    interval = setInterval(()=>{
        currentSlide = currentSlide < slides.length - 1 ? ++currentSlide : 0;
        changeSlide()
    }, 2000);
}
if(slides.length > 0){
    init();
}


for(let sn of slideNavs){
    sn.onclick = () => {
        currentSlide = +sn.dataset.slide;
        clearInterval(interval);
        changeSlide();
        init();
    }
}

function changeSlide(){
    for(let i = 0; i < slides.length; i++){
        slides[i].classList.remove('active');
        slideNavs[i].classList.remove('active');
    }
    slides[currentSlide].classList.add('active');
    slideNavs[currentSlide].classList.add('active');
}

// checked filter

const filterTitles = document.querySelectorAll('.filters .group');
const filters = document.querySelectorAll('.filters input');
const productsOnPage = document.querySelectorAll('.catalogue .item');
const filtered = {};

filterTitles.forEach(filter => {
    filter.onclick = () => {
        filter.classList.toggle('active');
        filter.classList.toggle('inactive');
    }
});

filters.forEach(f => {
    f.onchange = ()=> {
        const filterData = f.id.split('_');
        if(f.checked === true){
            if(filterData[0] in filtered){
                filtered[filterData[0]].push(filterData[1]);
            }
           else{
            filtered[filterData[0]] = [filterData[1]];
           }
        }
        else{
            filtered[filterData[0]].forEach((filter, index)=>{
                if(f.value === filter){
                    filtered[filterData[0]].splice(index,1);
                }
            });
        }
        showFilteredProducts();
    }
});



function showFilteredProducts(){
    let filtersCount = 0;
    for(let prop in filtered){
        filtersCount += filtered[prop].length;
    }
    if(filtersCount === 0){
        for(let p of productsOnPage){
            p.style.display = 'block';
        }   
    }
    else{
       let prodCopy = [].slice.call(productsOnPage);
       for(let f in filtered){
            if(filtered[f].length > 0){
                prodCopy = prodCopy.filter(item => {
                    if(filtered[f].includes(item.dataset[f])){
                        return item;
                    }
                });
            }
       }
       for(let p of productsOnPage){
            p.style.display = 'none';
        } 
        for(let p of prodCopy){
            p.style.display = 'block';
        } 
    }
}

// sort by price 
const sortedBy = document.querySelector('.sorter_value');
const sortOptions = document.querySelectorAll('.sort_opt');

for(let opt of sortOptions){
    opt.onclick = () => {
        sortItems(opt.dataset.sort);
        sortedBy.textContent = `Відсортовано за ${opt.dataset.sort === 'price' ? 'ціною' : 'назвою' }`;
    }
}


// sort  

function sortItems(type){
    let filelds = document.querySelectorAll(`.item .${type} p`);
    filelds = [].slice.call(filelds);
    filelds.sort((a,b)=>{
        
        if(type === 'price'){
            a = +a.textContent.substring(0, a.textContent.length - 5);
            b = +b.textContent.substring(0, b.textContent.length - 5);
        }
        else{
            a = a.textContent;
            b = b.textContent;
        }

        if(a > b){
            return 1;
        }
        else if(a < b){
            return -1;
        }
        else {
            return 0;
        }
    })
    filelds.forEach((item,index) => item.parentNode.parentNode.style.order = index);
}

// get products

let storage = window.localStorage;
const APP_NAME = 'Aestetics_shop';
const url = 'js/data.json';
let data;

let promise = fetch(url);
promise.then(res => res.json()).then(result =>  data = result);


// add to cart

const cart = storage.getItem(APP_NAME) != null ? JSON.parse(storage.getItem(APP_NAME)) : [];
const cartIcon = document.querySelector('.basket a');
let cartCount = 0;
let cartTotal = 0;
const textCount = document.querySelector('.cart_count');
const textTotal = document.querySelector('.cart_sum');

for(let product of cart){
    cartCount += +product.count;
    cartTotal += +product.count * product.price;
}
cartIcon.innerText = cartCount;


document.addEventListener('click', (event)=>{
    if(event.target.classList.contains('btn-mini')){
        const id = +event.target.dataset.id;
        addToCart(id);
    }
    if(event.target.parentNode.classList.contains('btn-mini')){
        const id = +event.target.parentNode.dataset.id;
        addToCart(id);
    }
});

function addToCart(id){
    let added;
    data.forEach(item => {
        if(item.id === id){
            added = item;
        } 
    });
    let wasInCart = false;
    cart.forEach(inCart => {
        if(inCart.id === added.id){
            wasInCart = true;
            inCart.count += 1;
        }
    });
    if(!wasInCart){
        cart.push({...added, count: 1});
    }
    saveCartToLS();
}

function saveCartToLS(){
    storage.setItem(APP_NAME, JSON.stringify(cart));
}

// cart page 

const cart_inner = document.querySelector('.cart_inner');

function buildCart(){
    cart.forEach((item) => {
        const product = document.createElement('div');
        product.classList.add('cart_item');

        const name = document.createElement('div');
        name.innerText = item.name;
        name.classList.add('prod_name');

        const counter = document.createElement('input');
        counter.classList.add('counter');
        counter.setAttribute('type', 'number');
        counter.setAttribute('min', '1');
        counter.value = item.count;
        counter.onchange = () => changeCount(counter.value, item.id);

        const price = document.createElement('div');
        price.classList.add('price');
        price.innerText = item.price * item.count;

        const delBtn = document.createElement('div');
        delBtn.classList.add('del');
        delBtn.onclick = () => {
            product.remove();
            deleteFromCart(item.id);
        }

        product.append(name, counter, price, delBtn);

        cart_inner.append(product);
    });
}

function changeCount(count, id){
    cart.forEach(item => {
        if(item.id === id){
            item.count = count;
        }
    });
    saveCartToLS();
    placeCountAndTotal();
}

function deleteFromCart(id){
    cart.forEach((item, index) => {
        if(item.id === id){
            cart.splice(index, 1);
        }
    });
    saveCartToLS();
    placeCountAndTotal();
}

if(window.location.href.includes('cart')){
    buildCart();
    placeCountAndTotal();
}

function placeCountAndTotal(){
    cartCount = 0;
    cartTotal = 0;
    for(let product of cart){
        cartCount += +product.count;
        cartTotal += product.count * product.price;
    }
    textCount.innerText = cartCount;
    textTotal.innerText = cartTotal;
}


//  contact form

const form = document.querySelector('form.bottom-group');
const nameInput = document.querySelector('input#name');
const phoneInput = document.querySelector('input#telephone');
const formEndpoint = '../mail.php';

if(form){
    form.onsubmit = (e) => {
    e.preventDefault();

    if(phoneInput.value.match(/^\+38 \(\d{3}\) [0-9]{3} [0-9]{2} [0-9]{2}/)){
        // send form
        
        let formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('telephone', phoneInput.value);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', formEndpoint);
        xhr.send(formData);
        xhr.onload = () =>{
            if(xhr.status === 200){
                console.log('Success!');
                nameInput.value = '';
                phoneInput.value = '';
                // show modal window with confirmation
            }
            else{
                console.error(xhr.status); 
                // show popup or error inside form
            }
        };
    }
    else{
        phoneInput.style.border = '1px solid red';
        alert('Fill your phone in format +38 (000) 000 00 00');
    }

    }
}