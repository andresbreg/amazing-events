const upcomingEventsFilterContainer = document.getElementById('upcoming-events-filter-container');
const upcomingEventsCheckboxes = document.getElementsByClassName('upcoming-events-check-input');
const upcomingEventsSearchBar = document.getElementById('upcoming-events-search-bar');
const upcomingEventsCardContainer = document.getElementById('upcoming-events-card-container');

let upcomingEvents = allEvents.filter(event => event.date > currentDate);
let upcomingEventsCategories = [];
let upcomingEventsCheckboxFilter = [];
let upcomingEventsFilterResult = [];

// Dynamic Cards

upcomingEvents.sort((x,y) => x.date.localeCompare(y.date));

function createUpcomingEventCard(eventArray) {
  upcomingEventsCardContainer.innerHTML = '';
  eventArray.forEach((event) => {upcomingEventsCardContainer.innerHTML +=
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
}

createUpcomingEventCard(upcomingEvents);

// Categories

for (const event of upcomingEvents) {
  if (upcomingEventsCategories.indexOf(event.category) == -1) upcomingEventsCategories.push(event.category);
}

upcomingEventsCategories.sort();
upcomingEventsCategories.forEach((category) => {upcomingEventsFilterContainer.innerHTML +=
  `<fieldset class="mx-3 mx-md-4">
    <input class="form-check-input upcoming-events-check-input" type="checkbox" value="${category}" id="${category}">
    <label class="form-check-label px-1" for="${category}">${category}</label>
  </fieldset>`
});

// Checkbox Filter

for (const checkbox of upcomingEventsCheckboxes) {
  checkbox.addEventListener('change', () => {
    if (upcomingEventsSearchBar.value != '') upcomingEventsSearchBar.value = '';
    if (checkbox.checked) upcomingEventsCheckboxFilter.push(checkbox.id);
    else upcomingEventsCheckboxFilter = upcomingEventsCheckboxFilter.filter((category) => category !== checkbox.id);
    upcomingEventsFilterResult = upcomingEvents.filter((event) => upcomingEventsCheckboxFilter.includes(event.category));
    if (upcomingEventsFilterResult.length != 0) createUpcomingEventCard(upcomingEventsFilterResult);
    else createUpcomingEventCard(upcomingEvents);
  });
}

// Search Bar

function upcomingEventsSearch(eventArray) {
  const upcomingEventsSearchResult = eventArray.filter((event) =>
   event.name.toLowerCase().includes(upcomingEventsSearchBar.value.toLowerCase()) ||
   event.description.toLowerCase().includes(upcomingEventsSearchBar.value.toLowerCase()));
  createUpcomingEventCard(upcomingEventsSearchResult);
  if (upcomingEventsSearchResult.length == 0) upcomingEventsCardContainer.innerHTML =
    `<p class="no-results-message">There are no results that match your search</p>`  
}

upcomingEventsSearchBar.addEventListener('change', () => {
  if (upcomingEventsFilterResult.length == 0) upcomingEventsSearch(upcomingEvents);
  else upcomingEventsSearch(upcomingEventsFilterResult);
});