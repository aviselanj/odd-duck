"use-strict";

const  product= [
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
   new Product("wine-glass", "/img/wine-glass.jpg")
  ];
  let myChart = null;
  let state = {
   product: [],
   imageContainer: document.getElementById("image-container"),
   resultsSection: document.getElementById("results-section"),
   productsShown: [],
   prevShown: [],
   
};

let votingRounds = 0;

// add event listener to image container
state.imageContainer.addEventListener("click", handleClickProduct);


// constructor function for product

function Product(name, filePath, views, votes){
   this.name = name; 
   this.filePath = filePath;
   this.lastClicked = null;
   this.views = views;
   this.votes = votes;
}
// method to render product image
Product.prototype.render = function(){
   const productImg = document.createElement("img");
   productImg.src = this.filePath;
   productImg.alt = this.name;
   state.imageContainer.appendChild(productImg);
};
getLocalStorage();
renderProduct();
renderResults();

function renderProduct(){
   state.imageContainer.innerHTML = "";
   
   // turn current array into previous array so UI is using different products in each array.
   state.prevShown = state.productsShown;
   state.productsShown = [];

   // get 3 random votes and add to currArr

   while(state.productsShown.length < 3){
      const randomInt = getRandomInt(0, state.product.length);
      const randomProduct = state.product[randomInt];
      if(
         !state.productsShown.includes(randomProduct) &&
         !state.prevShown.includes(randomProduct)){
         state.productsShown.push(randomProduct);
      }
   }

   for(let i = 0; i < state.productsShown.length; i++){
      state.productsShown[i].views++;
      state.productsShown[i].render();
   }
   
}


function handleClickProduct(event){
   event.preventDefault();

   const target = event.target.alt;

   // loop through product array, once the clicked one is found, we increment the product clicks
   for(let i = 0; i < state.product.length; i++){
      if(target === state.product[i].name){
         state.product[i].votes++;
      }
   }
   setLocalStorage();
   renderProduct();
   renderResults();
   rounds++;
}

function renderResults() {
   state.resultsSection.innerHTML = "";
   renderChart();
   const resultsElm = document.createElement("ul");
 
   for (let i = 0; i < state.product.length; i++) {
     const products = state.product[i];
 
     const resultItemElm = document.createElement("li");
     resultItemElm.textContent = `${products.name} was seen ${products.views} and was clicked ${products.votes} times.`;
     resultsElm.appendChild(resultItemElm);
   }
 
   state.resultsSection.appendChild(resultsElm);
   endVote(votingRounds);
   reset();
 }

 function renderChart() {
   const ctx = document.getElementById("my-chart");
 
   const labels = [];
   const votes = [];
   const views = [];
 
   // populate the labels, votes, and views arrays
   for (let i = 0; i < state.product.length; i++) {
     const products = state.product[i];
 
     labels.push(products.name);
     votes.push(products.votes);
     views.push(products.views);
   }
 
   // since we are re-rendering the chart, need to destroy old one before rendering new one
   if (myChart) {
     myChart.clear();
     myChart.destroy();
   }
 
   myChart = new Chart(ctx, {
     type: "bar",
     data: {
       labels: labels, 
       datasets: [
         {
           label: "# of Votes",
           data: votes,
           borderWidth: 1,
         },
         {
           label: "# of Views",
           data: views,
           borderWidth: 1,
         },
       ],
     },
     options: {
       scales: {
         y: {
           beginAtZero: true,
         },
       },
     },
   });
 }

 
    


 function getRandomInt(min, max) {
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
 }
 


function setLocalStorage(){
   localStorage.setItem('state', JSON.stringify(state));
}

function getLocalStorage(){
   if(localStorage.state){

      const storedData = JSON.parse(localStorage.state);

      for(let i = 0; i < storedData.product.length; i++){
         const products = storedData.product[i];
         const newProduct = new Product(
            products.name,
            products.filePath,
            products.views, 
            products.votes
            );
         state.product.push(newProduct);
      }
   }
   else{
      for(let i = 0; i < product.length; i++){
         state.product.push(product[i]);
      }
   }
}

function endVote(){
   if(votingRounds == 25){
   votingRounds = 0;
   }
}
function reset(votingRounds){
   if(endVote){
      state.imageContainer.removeEventListener(click, handleClickProduct, true)
   }
}
//As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
//By default, the user should be presented with 25 rounds of voting before ending the session.
//Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.
