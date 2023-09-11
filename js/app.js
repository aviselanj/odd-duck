"use strict"

const state = {
   product:[
    new Product("bag", "/img/bag.jpg"),
    new Product("banana", "/img/banana.jpg"),
    new Product("bathroom", "/img/bathroom.jpg"),
    new Product("boots", "/img/boots.jpg"),
    new Product("breakfast", "/img/breakfast.jpg"),
    new Product("bubblegum", "/img/bubblegum.jpg"),
    new Product("chair", "/img/chair.jpg"),
    new Product("cthulhu", "/img/cthulhu.jpg"),
    new Product("dog-duck", "/img/dog-duck.jpg"),
    new Product("dragon", "/img/dragon.jpg"),
    new Product("pen", "/img/pen.jpg"),
    new Product("pet-sweep", "/img/pet-sweep.jpg"),
    new Product("scissors", "/img/scissors.jpg"),
    new Product("shark", "/img/shark.jpg"),
    new Product("sweep", "/img/sweep.png"),
    new Product("unicorn", "/img/unicorn.jpg"),
    new Product("water-can", "/img/water-can.jpg"),
    new Product("wine-glass", "/img/wine-glass.jpg"),
   ],
   imageContainer: document.getElementById("image-container"),
   resultsSection: document.getElementById("results-section")
};

// constructor function for product

function Product(name, filePath){
   this.name = name; 
   this.filePath = filePath;
   this.lastClicked = null;
   this.votes = 0;
   this.views = 0;
}
// method to render product image
Product.prototype.render = function(){
   const productImg = document.createElement("img");
   productImg.src = this.filePath;
   productImg.alt = this.name;
   state.imageContainer.appendChild(productImg);
};

function renderProduct(){
   state.imageContainer.innerHTML = "";
   state.imageContainer.addEventListener("click", handleClickProduct);
 
   let productOne = state.product[getRandomInt(0, state.product.length)];
   let productTwo = state.product[getRandomInt(0, state.product.length)];
   let productThree = state.product[getRandomInt(0, state.product.length)];
   //let newArr = [];
   for(let i = 0; i < 3; i++) {
     productOne = state.product[getRandomInt(0, state.product.length)];
   }
 
   productOne.views++;
   productTwo.views++;
   productThree.views++;
 
   productOne.render();
   productTwo.render();
   productThree.render();
}

renderProduct();

function handleClickProduct(event){
   event.preventDefault();

   const target = event.target.alt;

   // loop through product array, once the clicked one is found, we increment the product clicks
   for(let i = 0; i < state.product.length; i++){
      if(target === state.product[i].name){
         state.product[i].votes++;
      }
   }
   renderProduct();
   renderResults();
}

function renderResults() {
   state.resultsSection.innerHTML = "";
   const resultsElm = document.createElement("ul");
 
   for (let i = 0; i < state.product.length; i++) {
     const product = state.product[i];
 
     const resultItemElm = document.createElement("li");
     resultItemElm.textContent = `${product.name} was seen ${product.views} and was clicked ${product.votes} times.`;
     resultsElm.appendChild(resultItemElm);
   }
 
   state.resultsSection.appendChild(resultsElm);
 }

 function getRandomInt(min, max) {
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
 }