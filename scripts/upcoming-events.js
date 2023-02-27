let upcomingEvents = [];

for (let i=0; i < allEvents.length; i++) {    
    
    if (allEvents[i].date > currentDate) {
        upcomingEvents.push(allEvents[i]);
        upcomingEvents.sort((x, y) => x.date.localeCompare(y.date));
    }
    else {        
    }
}

const upcomingEventCardContainer = document.querySelector('#upcoming-event-card-container');

let upcomingEventCards = createUpcomingEventCard(upcomingEvents);

upcomingEventCardContainer.innerHTML = upcomingEventCards;

function createUpcomingEventCard(events) {
  let card = '';
  for (const event of events) {
    card += `<div class="card col-10 col-sm-5 col-xl-3">
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
  }
  return card;
}