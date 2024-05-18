var allRecipe = [];
async function getRecipe() {
  try {
    var response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    var finalData = await response.json();
    allRecipe = finalData.meals;
    display();
  } catch (error) {
    console.log("error");
  }
}

getRecipe();

function display() {
  var cartona = ``;
  for (var i = 0; i < allRecipe.length; i++) {
    cartona += `
      <div onclick="getRecipeDetails('${allRecipe[i].idMeal}')" class="home relative w-1/3 py-10 px-3 mx-auto">
        <img class="rounded-lg" src="${allRecipe[i].strMealThumb}" alt="" />
        <div class="layer absolute w-full h-full bg-black/50 flex">
          <h3 class="text-white text-2xl font-bold self-center">${allRecipe[i].strMeal}</h3>
        </div>
      </div>
    `;
  }
  document.querySelector(`.card`).innerHTML = cartona;
}

async function getRecipeDetails(id) {
  try {
    var response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    var finalData = await response.json();
    var recipe = finalData.meals[0];
    displayRecipeDetails(recipe);
  } catch (error) {
    console.log("error details");
  }
}

function displayRecipeDetails(recipe) {
  var cartona = `
    <div class="w-1/4 pe-3 pt-10 ">
      <img src="${recipe.strMealThumb}" class="rounded-md"/>
      <h1 class="text-3xl font-bold">${recipe.strMeal}</h1>
    </div>
    <div class="w-3/4 text-white pt-10 text-start">
      <h1 class="text-3xl font-bold pb-3">Instructions</h1>
      <p class="text-lg">${recipe.strInstructions}</p>
      <h4 class="text-2xl font-bold pb-2 pt-3"><span class="font-extrabold">Area: </span> ${
        recipe.strArea
      }</h4>
      <h4 class="text-2xl font-bold py-2"><span class="font-extrabold">Category: </span>${
        recipe.strCategory
      }</h4>
      <div class="text-start">
        <h4 class="text-2xl font-bold py-2">Ingredients: </h4>
        <ul class="flex list-none flex-wrap gap-3">
          ${generateIngredientsList(recipe)}
        </ul>
      </div>
      <div>
        <h4 class="text-2xl font-bold py-2 mb-4">Tags: </h4>
        <div class="flex gap-2">
          <a href="${
            recipe.strSource
          }" class="py-2 rounded-md px-4 text-lg bg-green-800 hover:bg-green-600">Source</a>
          <a href="${
            recipe.strYoutube
          }" class="py-2 rounded-md px-4 text-lg bg-red-700 hover:bg-red-600">YouTube</a>
        </div>
      </div>
    </div>
  `;
  document.querySelector(`.card`).innerHTML = cartona;
}

function generateIngredientsList(recipe) {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    let ingredient = recipe[`strIngredient${i}`];
    let measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredientsList += `<li class="bg-emerald-300 m-2 text-emerald-900 rounded-sm text-lg">${measure} ${ingredient}</li>`;
    }
  }
  return ingredientsList;
}

/////////////////////////////////////////
//categories

async function categories() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let finalData = await response.json();
    allRecipe = finalData.categories;
    displayCategoty(allRecipe);
    console.log(allRecipe);
  } catch (error) {
    console.log("error category");
  }
}

function displayCategoty(arr) {
  var cartona = ``;
  for (var i = 0; i < arr.length; i++) {
    cartona += `
        
        <div onclick="getCategoryMeals('${
          arr[i].strCategory
        }')" class="home relative  py-10   mx-auto">
        <img class="rounded-lg"  src="${arr[i].strCategoryThumb}" alt="" />
        <div class="layer  absolute w-full h-full  bg-black/50  grid">
        <h1 class="text-white text-2xl font-bold self-center" >${
          arr[i].strCategory
        }</h1>
            <p class="text-white text-lg font-bold ">${arr[
              i
            ].strCategoryDescription
              .split(" ")
              .slice("0", "20")
              .join(" ")}</p>

        </div>
     </div>
        `;
  }
  document.querySelector(`.card`).innerHTML = cartona;
}

async function getCategoryMeals(category) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    let finalData = await response.json();
    allRecipe = finalData.meals;
    display(allRecipe.slice(0, 20));
  } catch {
    console.log("errrrr");
  }
}
//////////////////////////////////////
async function Area() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let finalData = await response.json();
    allRecipe = finalData.meals;
    displayArea(allRecipe);
    console.log(allRecipe);
  } catch (error) {
    console.log("area errorr");
  }
}

function displayArea(arr) {
  var cartoona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div onclick="AreaMeals('${arr[i].strArea}')"  class="home w-1/6 relative  py-10   mx-auto">
  
      <i class="fa-solid fa-house-laptop text-[80px] " style="color: #e3e3e3;"></i>
      <h3 class="text-white text-2xl font-bold self-center" >${arr[i].strArea}</h3>

      </div>
      `;
  }

  document.querySelector(`.card`).innerHTML = cartoona;
}
async function AreaMeals(area) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    let finalData = await response.json();
    allRecipe = finalData.meals;
    display(allRecipe.slice(0, 20));
    console.log(allRecipe);
  } catch (error) {
    console.log("area ");
  }
}

////////////////////////////////////////////
//ingredients
async function Ingredients() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let finalData = await response.json();
    allRecipe = finalData.meals;
    displayAllIngredient(allRecipe);
  } catch (error) {
    console.log(" ingredients:", error);
  }
}

function displayAllIngredient(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    let description = arr[i].strDescription;
    if (description !== null) {
      cartona += `
          <div onclick="IngredientsMeals('${
            arr[i].strIngredient
          }')"  class="home relative py-10 w-1/3 mx-auto">
              <i class="fa-solid fa-drumstick-bite text-[80px]" style="color: #e6e6e6;"></i>
              <h3 class="text-white text-2xl font-bold self-center">${
                arr[i].strIngredient
              }</h3>
              <p class="text-white text-lg font-bold">${arr[i].strDescription
                .split(" ")
                .slice(0, 15)
                .join(" ")}</p>
 
          </div> `;
    }
  }
  document.querySelector(`.card`).innerHTML = cartona;
}
async function IngredientsMeals(ingredient) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    let finalData = await response.json();
    allRecipe = finalData.meals;
    display(allRecipe);
  } catch (error) {
    console.log(" ingredients:", error);
  }
}
/////////////////////////////////
// let card =document.getElementsByClassName('card');
function showSearchInputs() {
  document.getElementsByClassName("card")[0].classList.add("hidden");
  document.querySelector(".search").classList.remove("hidden");
  document.querySelector(".search").classList.add('flex');
  // card.innerHTML =`
  // <div class="flex gap-2 my-10">
  //           <input onkeyup="searchitem()" id="searchName" type="text" placeholder="search by name" class="text-white w-full h-11 p-4 rounded-md text-lg bg-transparent border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  focus:ring-1" />
  //           <input onkeyup="searchLetter()" maxlength="1" id="searchLetter" type="text" placeholder="search by first letter" class="text-white w-full h-11 p-4 rounded-md text-lg bg-transparent border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  focus:ring-1"/>
  //       </div>

  //       <div class="card hidden  grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 py-10   mx-auto">

  //       </div>
  // `
  console.log("inputs");
}
//search by name
var searchInput = document.getElementById("searchName");
async function searchitem(event) {
  event.preventDefault();
  var item = searchInput.value;
  try {
    var response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
    );
    var finalData = await response.json();
    allRecipe = finalData.meals;
    display(allRecipe);
    document.getElementsByClassName("card")[0].classList.remove("hidden");
    document.querySelector(".search").classList.remove("hidden");
    document.querySelector(".search").classList.add('flex');
    console.log(allRecipe);
  } catch (error) {
    console.log("kkkk");
  }
}

//search by first letter
var searchletter = document.getElementById("searchLetter");

async function searchLetter(event) {
  event.preventDefault();

  var item = searchletter.value;
  try {
    var response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`
    );
    var finalData = await response.json();
    allRecipe = finalData.meals;
    display(allRecipe);
    document.getElementsByClassName("card")[0].classList.remove("hidden");
    document.querySelector(".search").classList.remove("hidden");
    document.querySelector(".search").classList.add('flex');
    console.log(allRecipe);
  } catch (error) {
    console.log("mmmmm");
  }
}
/////////////////////////////////////////////////

//contact
function contactForm() {
  document.getElementsByClassName("card")[0].classList.add("hidden");
  document.querySelector(".search").classList.add("hidden");

document.querySelector('.contact-form').classList.remove('hidden')
}
nameInput = document.getElementById("Name");
emailInput = document.getElementById("email");
phoneInput = document.getElementById("phone");
ageInput = document.getElementById("age");
passInput = document.getElementById("password");
repassInput = document.getElementById('repassword');
infoContainer = [];


let information ={
    nname : nameInput.value,
    email : emailInput.value,
    phone : phoneInput.value,
    age : ageInput.value,
    pass : passInput.value,
    repass : repassInput.value,
}


function validation(element) {
    let regix={
        Name : /^[a-zA-Z]{3,10}$/,
        email : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone : /^(002)?01[0125][0-9]{8}$/,
        age : /^[1-9][0-9]?$|^100$/,
        password : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        repassword : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };
    if (repassword.value !== password.value) {
        console.log('no0000 match');
        element.classList.add('focus:ring-t-indigo-950');
        element.classList.remove('focus:ring-t-red-700');
        element.nextElementSibling.classList.remove('hidden');
         
    } else {
        
        element.nextElementSibling.classList.add('hidden');
    }

    

    if(regix[element.id].test(element.value) === true){
        console.log('match')
        element.classList.add('focus:ring-t-red-700');
        element.classList.remove('focus:ring-t-indigo-950');
        element.nextElementSibling.classList.add('hidden');

    }else{
        console.log('no match')
        element.classList.add('focus:ring-t-indigo-950');
        element.classList.remove('focus:ring-t-red-700');
        element.nextElementSibling.classList.remove('hidden');

    }

    let allValid = Object.keys(regix).every(id => regix[id].test(document.getElementById(id).value));

    if(allValid){
        document.getElementById('dis').removeAttribute("disabled");
    }else{
        document.getElementById('dis').setAttribute("disabled" , "disabled");
    
    } 
}

//jquery open side bar
let sidebarWidth = $(".menue").innerWidth();
$(".close").click(function () {
  console.log(sidebarWidth);

  if ($(".sidebar").css("left") == "0px") {
    $(".close").removeClass("fa-x").addClass("fa-bars");

    $(".sidebar").animate({ left: -sidebarWidth }, 500);
    $(".menue").css("display", "grid");
    for (let i = 0; i < 5; i++) {
      $(".link li")
        .eq(i)
        .animate(
          {
            display: "block",
          },
          (i + 5) * 100
        );
    }
  } else {
    $(".sidebar").animate({ left: "0px" }, 500);

    $(".close").removeClass("fa-bars").addClass("fa-x");
    $(".menue").css("display", "hidden");
  }
});
