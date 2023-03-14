const upcomingEventsFilterContainer = document.getElementById('upcoming-events-filter-container');
const upcomingEventsCheckboxes = document.getElementsByClassName('upcoming-events-check-input');
const upcomingEventsSearchBar = document.getElementById('upcoming-events-search-bar');
const upcomingEventsCardContainer = document.getElementById('upcoming-events-card-container');

let currentDate = '';
let allEvents = [];
let upcomingEvents = [];
let upcomingEventsCategories = [];
let upcomingEventsCheckboxFilter = [];
let upcomingEventsFilterResult = [];
let upcomingEventsSearchResult = [];

// Data Fetch

function upcomingEventsDataFetch() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(apiData => {
      currentDate = apiData.currentDate;
      allEvents = apiData.events;        
      upcomingEvents = allEvents.filter(event => event.date > currentDate);
      getUpcomingEventsCategories(upcomingEvents);
      showUpcomingEventsCategories(upcomingEventsCategories);
      createUpcomingEventsCards(upcomingEvents);
      filterUpcomingEventsCategories();
    })
    .catch(error => console.log(error.message));    
}

upcomingEventsDataFetch();

// Dynamic Cards

function createUpcomingEventsCards(eventArray) {
  cards = '';  
  eventArray.sort((x,y) => x.date.localeCompare(y.date));
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
  upcomingEventsCardContainer.innerHTML = cards;
}

// Categories

function getUpcomingEventsCategories(eventArray) {
  for (const event of eventArray) {
    if (upcomingEventsCategories.indexOf(event.category) == -1) upcomingEventsCategories.push(event.category);
  }  
}

function showUpcomingEventsCategories(categoryArray) {
  categoriesFilter = '';
  categoryArray.sort();
  categoryArray.forEach(category => {categoriesFilter +=
    `<fieldset class="mx-3 mx-md-4">
      <input class="form-check-input upcoming-events-check-input" type="checkbox" value="${category}" id="${category}">
      <label class="form-check-label px-1" for="${category}">${category}</label>
    </fieldset>`
  });
  upcomingEventsFilterContainer.innerHTML = categoriesFilter;
}

// Checkbox Filter

function filterUpcomingEventsCategories() {
  for (const checkbox of upcomingEventsCheckboxes) {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) upcomingEventsCheckboxFilter.push(checkbox.id);
      else upcomingEventsCheckboxFilter = upcomingEventsCheckboxFilter.filter(category => category != checkbox.id);
      if (upcomingEventsSearchResult.length == 0) {
        upcomingEventsFilterResult = upcomingEvents.filter(event => upcomingEventsCheckboxFilter.includes(event.category));
      }
      else if (upcomingEventsFilterResult != 0) {
        upcomingEventsFilterResult = upcomingEvents.filter(event => upcomingEventsCheckboxFilter.includes(event.category));
        upcomingEventsSearchResult = [];
        upcomingEventsSearchBar.value = '';
      }
      else {
        upcomingEventsFilterResult = upcomingEventsSearchResult.filter(event => upcomingEventsCheckboxFilter.includes(event.category));
        upcomingEventsSearchResult = [];
        upcomingEventsSearchBar.value = '';
      }
      if (upcomingEventsFilterResult.length != 0) createUpcomingEventsCards(upcomingEventsFilterResult);
      else createUpcomingEventsCards(upcomingEvents);
    });
  }  
}

// Search Bar

function upcomingEventsSearch(eventArray) {
  upcomingEventsSearchResult = eventArray.filter(event =>
   event.name.toLowerCase().includes(upcomingEventsSearchBar.value.toLowerCase()) ||
   event.description.toLowerCase().includes(upcomingEventsSearchBar.value.toLowerCase()));
   createUpcomingEventsCards(upcomingEventsSearchResult);
  if (upcomingEventsSearchResult.length == 0) upcomingEventsCardContainer.innerHTML =
    `<p class="no-results-message">There are no results that match your search</p>`  
}

upcomingEventsSearchBar.addEventListener('change', () => {
  if (upcomingEventsFilterResult.length == 0) upcomingEventsSearch(upcomingEvents);
  else upcomingEventsSearch(upcomingEventsFilterResult);
});