let pastEvents = [];

for (let i=0; i < allEvents.length; i++) {    
    
    if (allEvents[i].date < currentDate) {
        pastEvents.push(allEvents[i]);
        pastEvents.sort((x, y) => x.date.localeCompare(y.date));
        pastEvents.reverse();
    }
    else {
    }
}

const pastEventCardContainer = document.querySelector('#past-event-card-container');

let pastEventsCards = createPastEventCard(pastEvents);

pastEventCardContainer.innerHTML = pastEventsCards;

function createPastEventCard(events) {
  let card = '';
  for (const event of events) {
    card += `<div class="card col-10 col-sm-5 col-xl-3">
                <img src="${event.image}" alt="Event cover">
                <div class="card-body d-flex flex-column justify-content-between">
                  <p>${event.category}</p>
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text">${event.description}</p>
                  <div class="d-flex justify-content-between">
                    <p>${event.date}</p>
                    <p>$${event.price}</p>
                  </div>
                  <a href="details.html" class="btn details-btn">Details</a>
                </div>
              </div>`
  }
  return card;
}