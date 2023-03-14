const pastEventsFilterContainer = document.getElementById('past-events-filter-container');
const pastEventsCheckboxes = document.getElementsByClassName('past-events-check-input');
const pastEventsSearchBar = document.getElementById('past-events-search-bar');
const pastEventsCardContainer = document.getElementById('past-events-card-container');

let currentDate = '';
let allEvents = [];
let pastEvents = [];
let pastEventsCategories = [];
let pastEventsCheckboxFilter = [];
let pastEventsFilterResult = [];
let pastEventsSearchResult = [];

// Data Fetch

function pastEventsDataFetch() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(apiData => {
      currentDate = apiData.currentDate;
      allEvents = apiData.events;        
      pastEvents = allEvents.filter(event => event.date < currentDate);
      getPastEventsCategories(pastEvents);
      showPastEventsCategories(pastEventsCategories);
      createPastEventsCards(pastEvents);
      filterPastEventsCategories();
    })
    .catch(error => console.log(error.message));    
}

pastEventsDataFetch();

// Dynamic Cards

function createPastEventsCards(eventArray) {
  cards = '';
  eventArray.sort((x,y) => x.date.localeCompare(y.date));
  eventArray.reverse();
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
  pastEventsCardContainer.innerHTML = cards;
}

// Categories

function getPastEventsCategories(eventArray) {
  for (const event of eventArray) {
    if (pastEventsCategories.indexOf(event.category) == -1) pastEventsCategories.push(event.category);
  }
}

function showPastEventsCategories(categoryArray) {
  categoriesFilter = '';
  categoryArray.sort();
  categoryArray.forEach(category => {categoriesFilter +=
    `<fieldset class="mx-3 mx-md-4">
      <input class="form-check-input past-events-check-input" type="checkbox" value="" id="${category}">
      <label class="form-check-label px-1" for="${category}">${category}</label>
    </fieldset>`
  });
  pastEventsFilterContainer.innerHTML = categoriesFilter;
}

// Checkbox Filter

function filterPastEventsCategories() {
  for (const checkbox of pastEventsCheckboxes) {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) pastEventsCheckboxFilter.push(checkbox.id);
      else pastEventsCheckboxFilter = pastEventsCheckboxFilter.filter(category => category != checkbox.id);
      if (pastEventsSearchResult.length == 0) {
        pastEventsFilterResult = pastEvents.filter(event => pastEventsCheckboxFilter.includes(event.category));
      }
      else if (pastEventsFilterResult != 0) {
        pastEventsFilterResult = pastEvents.filter(event => pastEventsCheckboxFilter.includes(event.category));
        pastEventsSearchResult = [];
        pastEventsSearchBar.value = '';
      }
      else {
        pastEventsFilterResult = pastEventsSearchResult.filter(event => pastEventsCheckboxFilter.includes(event.category));
        pastEventsSearchResult = [];
        pastEventsSearchBar.value = '';
      }
      if (pastEventsFilterResult.length != 0) createPastEventsCards(pastEventsFilterResult);
      else createPastEventsCards(pastEvents);
    });
  }
}

// Search Bar

function pastEventsSearch(eventArray) {
  pastEventsSearchResult = eventArray.filter(event =>
   event.name.toLowerCase().includes(pastEventsSearchBar.value.toLowerCase()) ||
   event.description.toLowerCase().includes(pastEventsSearchBar.value.toLowerCase()));
  createPastEventsCards(pastEventsSearchResult);
  if (pastEventsSearchResult.length == 0) pastEventsCardContainer.innerHTML =
    `<p class="no-results-message">There are no results that match your search</p>`
}

pastEventsSearchBar.addEventListener('change', () => {
  if (pastEventsFilterResult.length == 0) pastEventsSearch(pastEvents);
  else pastEventsSearch(pastEventsFilterResult);
});