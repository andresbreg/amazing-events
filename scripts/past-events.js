const pastEventsFilterContainer = document.getElementById('past-events-filter-container');
const pastEventsCheckboxes = document.getElementsByClassName('past-events-check-input');
const pastEventsSearchBar = document.getElementById('past-events-search-bar');
const pastEventsCardContainer = document.getElementById('past-events-card-container');

let pastEvents = allEvents.filter(event => event.date < currentDate);
let pastEventsCategories = [];
let pastEventsCheckboxFilter = [];
let pastEventsFilterResult = [];

// Dynamic Cards

pastEvents.sort((x,y) => x.date.localeCompare(y.date));
pastEvents.reverse();

function createPastEventCard(eventArray) {
  pastEventsCardContainer.innerHTML = '';
  eventArray.forEach((event) => {pastEventsCardContainer.innerHTML +=
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

createPastEventCard(pastEvents);

// Categories

for (const event of pastEvents) {
  if (pastEventsCategories.indexOf(event.category) == -1) pastEventsCategories.push(event.category);
}

pastEventsCategories.sort();
pastEventsCategories.forEach((category) => {pastEventsFilterContainer.innerHTML +=
  `<fieldset class="mx-3 mx-md-4">
    <input class="form-check-input past-events-check-input" type="checkbox" value="" id="${category}">
    <label class="form-check-label px-1" for="${category}">${category}</label>
  </fieldset>`
});

// Checkbox Filter

for (const checkbox of pastEventsCheckboxes) {
  checkbox.addEventListener('change', () => {
    if (pastEventsSearchBar.value != '') pastEventsSearchBar.value = '';
    if (checkbox.checked) pastEventsCheckboxFilter.push(checkbox.id);
    else pastEventsCheckboxFilter = pastEventsCheckboxFilter.filter((category) => category !== checkbox.id);
    const pastEventsFilterResult = pastEvents.filter((event) => pastEventsCheckboxFilter.includes(event.category));
    if (pastEventsFilterResult.length != 0) createPastEventCard(pastEventsFilterResult);
    else createPastEventCard(pastEvents);
  });
}

// Search Bar

function pastEventsSearch(eventArray) {
  const pastEventsSearchResult = eventArray.filter((event) =>
   event.name.toLowerCase().includes(pastEventsSearchBar.value.toLowerCase()) ||
   event.description.toLowerCase().includes(pastEventsSearchBar.value.toLowerCase()));
  createPastEventCard(pastEventsSearchResult);
  if (pastEventsSearchResult.length == 0) pastEventsCardContainer.innerHTML =
    `<p class="no-results-message">There are no results that match your search</p>`
}

pastEventsSearchBar.addEventListener('change', () => {
  if (pastEventsFilterResult.length == 0) pastEventsSearch(pastEvents);
  else pastEventsSearch(pastEventsFilterResult);
});