const filterContainer = document.getElementById('filter-container');
const checkboxes = document.getElementsByClassName('home-check-input');
const searchBar = document.getElementById('search-bar');
const cardContainer = document.getElementById('card-container');

let allEvents = [];
let categories = [];
let checkboxFilter = [];
let filterResult = [];
let searchResult = [];

// Data Fetch

function dataFetch() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(apiData => {
      allEvents = apiData.events;        
      getCategories(allEvents);
      showCategories(categories);
      createCards(allEvents);
      filterCategories();
    })
    .catch(error => console.log(error.message));    
}

dataFetch();

// Dynamic Cards

function createCards(eventArray) {
  cards = '';
  eventArray.forEach(event => {cards +=
    `<div class="card col-10 col-sm-5 col-xl-3">
      <img src="${event.image}" alt="Event cover" class="card-image">
      <div class="card-body d-flex flex-column justify-content-between">
        <p class="fw-semibold">${event.category}</p>
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <a href="details.html?id=${event._id}" class="btn details-btn">Details</a>
      </div>
    </div>`
  });
  cardContainer.innerHTML = cards;
}

// Categories

function getCategories(eventArray) {
  for (const event of eventArray) {
    if (categories.indexOf(event.category) == -1) categories.push(event.category);
  }
}

function showCategories(categoryArray) {
  categoriesFilter = '';
  categoryArray.sort();
  categoryArray.forEach(category => {categoriesFilter +=
    `<fieldset class=" mx-3 mx-md-4">
      <input class="form-check-input home-check-input" type="checkbox" value="${category}" id="${category}">
      <label class="form-check-label px-1" for="${category}">${category}</label>
    </fieldset>`
  });
  filterContainer.innerHTML = categoriesFilter;
}

// Checkbox Filter

function filterCategories() {
  for (const checkbox of checkboxes) {
    checkbox.addEventListener('change', () => {        
      if (checkbox.checked) checkboxFilter.push(checkbox.id);
      else checkboxFilter = checkboxFilter.filter(category => category != checkbox.id);
      if (searchResult.length == 0) {
        filterResult = allEvents.filter(event => checkboxFilter.includes(event.category));
      }
      else if (filterResult.length != 0) {
        filterResult = allEvents.filter(event => checkboxFilter.includes(event.category));
        searchResult = [];
        searchBar.value = '';
      }
      else {
        filterResult = searchResult.filter(event => checkboxFilter.includes(event.category)); 
        searchResult = [];
        searchBar.value = '';
      }
      if (filterResult.length != 0) createCards(filterResult);
      else createCards(allEvents);
    });
  }
}

// Search Bar

function search(eventArray) {  
  searchResult = eventArray.filter(event =>
    event.name.toLowerCase().includes(searchBar.value.toLowerCase()) || 
    event.description.toLowerCase().includes(searchBar.value.toLowerCase()));
  createCards(searchResult);  
  if (searchResult.length == 0) cardContainer.innerHTML =
    `<p class="no-results-message">There are no results that match your search</p>`
}

searchBar.addEventListener('change', () => {
  if (filterResult.length == 0) search(allEvents);
  else search(filterResult);
});