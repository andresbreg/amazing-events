const upcomingEventsFilterContainer = document.getElementById('upcoming-events-filter-container');
const upcomingEventsSearchBar = document.getElementById('upcoming-events-search-bar');
const upcomingEventsCardContainer = document.getElementById('upcoming-events-card-container');

let upcomingEvents = allEvents.filter(event => event.date > currentDate);
let upcomingEventsCategories = [];

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
        <div class="d-flex justify-content-between">
          <p class="fst-italic">${event.date}</p>
          <p>$${event.price}</p>
        </div>
        <a href="details.html" class="btn details-btn">Details</a>
      </div>
    </div>`
  });
}

createUpcomingEventCard(upcomingEvents);

// Categories

for (const event of upcomingEvents) {
  if (upcomingEventsCategories.indexOf(event.category) == -1) {
      upcomingEventsCategories.push(event.category)
  }
}

upcomingEventsCategories.sort();
upcomingEventsCategories.forEach((category) => {upcomingEventsFilterContainer.innerHTML +=
  `<fieldset class="px-2">
  <input class="form-check-input" type="checkbox" value="" id="${category}">
  <label class="form-check-label px-1" for="${category}">${category}</label>
  </fieldset>`
});

// Search Bar

upcomingEventsSearchBar.addEventListener('change', () => {
  const upcomingEventsSearchResult = upcomingEvents.filter((event) =>
   event.name.toLowerCase().includes(upcomingEventsSearchBar.value.toLowerCase()) ||
   event.description.toLowerCase().includes(upcomingEventsSearchBar.value.toLowerCase()))
  createUpcomingEventCard(upcomingEventsSearchResult);
  if (upcomingEventsSearchResult.length == 0) upcomingEventsCardContainer.innerHTML =
    `<p class="no-results-message">There are no results that match your search</p>`;
});