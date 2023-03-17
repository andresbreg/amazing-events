const eventsStats = document.getElementById('events-stats');
const upcomingEventsStats = document.getElementById('upcoming-events-stats');
const pastEventsStats = document.getElementById('past-events-stats');

let currentDate = '';
let allEvents = [];
let upcomingEvents = [];
let pastEvents = [];
let highestAttendance = {name: '', attendance: 0};
let lowestAttendance = {name: '', attendance: 0};
let largerCapacity = {name: '', capacity: 0}
let upcomingEventsDataByCategory = [];
let pastEventsDataByCategory = [];

// Data Fetch

function statsDataFetch() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(apiData => {
      currentDate = apiData.currentDate;
      allEvents = apiData.events;
      upcomingEvents = allEvents.filter(event => event.date > currentDate);
      pastEvents = allEvents.filter(event => event.date < currentDate);
      upcomingEventsDataByCategory = Object.values(getDataByCategory(upcomingEvents));
      pastEventsDataByCategory = Object.values(getDataByCategory(pastEvents));
      getEventsStats(pastEvents);
      showEventsStats(pastEvents, eventsStats);
      showStatsByCategory(upcomingEventsDataByCategory, upcomingEventsStats);
      showStatsByCategory(pastEventsDataByCategory, pastEventsStats);      
    })
    .catch(error => console.log(error.message));    
}

statsDataFetch();

// Get Events Stats

function getEventsStats(eventArray) {
  for (let i=0; i < eventArray.length; i++) {
    // Larger Capacity   
    if (eventArray[i].capacity > largerCapacity.capacity) {
      largerCapacity.capacity = eventArray[i].capacity;
      largerCapacity.name = eventArray[i].name;
    }  
    // Attendance Percentages
    let attendancePercentages = [];
    const percentage = ((eventArray[i].assistance / eventArray[i].capacity) * 100).toFixed(2);
    const eventAttendance = {name: eventArray[i].name, attendance: parseFloat(percentage)};
    attendancePercentages.push(eventAttendance);    
    // Highest and Lowest Attendance
    for (let i=0; i < attendancePercentages.length; i++) {
      const currentAttendance = attendancePercentages[i].attendance;
      if (currentAttendance > highestAttendance.attendance) {
        highestAttendance.name = attendancePercentages[i].name;
        highestAttendance.attendance = currentAttendance;
      }
      if (currentAttendance < lowestAttendance.attendance || lowestAttendance.attendance === 0) {
        lowestAttendance.name = attendancePercentages[i].name;
        lowestAttendance.attendance = currentAttendance;
      }
    }
  }
  return {highestAttendance, lowestAttendance, largerCapacity};
}

// Show Events Stats

function showEventsStats(dataArray, container) {
  data =
    `<tr>
      <td class="col-4 text-center">${highestAttendance.name}<br>(${highestAttendance.attendance}%)</td>
      <td class="col-4 text-center">${lowestAttendance.name}<br>(${lowestAttendance.attendance}%)</td>
      <td class="col-4 text-center">${largerCapacity.name}<br>(${largerCapacity.capacity})</td>
    </tr>`
  container.innerHTML = data;
}

// Get Data by Category

function getDataByCategory(eventArray) {
  return eventArray.reduce((accumulator, event) => {  
    if (!accumulator[event.category]) {
      accumulator[event.category] = {name: event.category, revenues: 0, capacity: 0, estimate_assistance: 0};
    } 
    accumulator[event.category].revenues += event.price * (event.estimate || event.assistance);
    accumulator[event.category].capacity += event.capacity;
    accumulator[event.category].estimate_assistance += event.estimate || event.assistance;
    return accumulator;
  },{});
}

// Show Stats by Category

function showStatsByCategory(dataArray, container) {
  data = '';
  dataArray.forEach(category => {data +=
    `<tr>
      <td class="col-4 text-center">${category.name}</td>
      <td class="col-4 text-center">$${category.revenues}</td>
      <td class="col-4 text-center">${((category.estimate_assistance / category.capacity) * 100).toFixed(2)}%</td>
    </tr>`
  });
  container.innerHTML = data;
}