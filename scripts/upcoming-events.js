const upcomingEventCardContainer = document.getElementById('upcoming-event-card-container');

let upcomingEvents = allEvents.filter(event => event.date > currentDate);

upcomingEvents.sort((x,y) => x.date.localeCompare(y.date));
upcomingEvents.forEach((event) => {upcomingEventCardContainer.innerHTML +=
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