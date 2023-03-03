const pastEventsFilterContainer = document.getElementById('past-events-filter-container');
const pastEventCardContainer = document.getElementById('past-event-card-container');

let pastEvents = allEvents.filter(event => event.date < currentDate);
let pastEventsCategories = [];

pastEvents.sort((x,y) => x.date.localeCompare(y.date));
pastEvents.reverse();
pastEvents.forEach((event) => {pastEventCardContainer.innerHTML +=
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

for (const event of pastEvents) {
  if (pastEventsCategories.indexOf(event.category) == -1) {
      pastEventsCategories.push(event.category)
  }
}

pastEventsCategories.sort();
pastEventsCategories.forEach((category) => {pastEventsFilterContainer.innerHTML +=
  `<fieldset class="px-2">
  <input class="form-check-input" type="checkbox" value="" id="${category}">
  <label class="form-check-label px-1" for="${category}">${category}</label>
  </fieldset>`
})