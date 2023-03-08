const detailsCardContainer = document.getElementById('details-card-container');

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

let eventDetails = allEvents.filter(event => event._id == id);

detailsCardContainer.innerHTML = 
`<div class="card m-3 p-3 m-sm-4 p-sm-4 d-flex justify-content-center align-items-center bg-light">
    <div class="row g-0">
        <div class="col-md-4 d-flex justify-content-center align-items-center">
            <img src="${eventDetails[0].image}" class="img-fluid rounded-start" alt="Event cover">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h6 class="fw-semibold text-center">${eventDetails[0].category}</h6>
                <h4 class="card-title fw-bolder text-center">${eventDetails[0].name}<span class="badge rounded-pill">$${eventDetails[0].price}</span></h5>
                <p class="card-text text-center py-2">${eventDetails[0].description}</p>
            </div>
            <div class="d-flex justify-content-around">
                <p><span class="fw-semibold">Place: </span>${eventDetails[0].place}</p>
                <p><span class="fw-semibold">Capacity: </span>${eventDetails[0].capacity}</p>
            </div>
            <div class="d-flex justify-content-around">
                <p><span class="fw-semibold">Date: </span>${eventDetails[0].date}</p>
                <p><span class="fw-semibold">${eventDetails[0].assistance ? 'Assistance: ' : 'Estimate: '}</span>${eventDetails[0].assistance || eventDetails[0].estimate}</p>
            </div>
        </div>
    </div>
</div>`