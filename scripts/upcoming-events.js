let upcomingEvents = [];

for (let i=0; i < allEvents.length; i++) {    
    
    if (allEvents[i].date > currentDate) {
        upcomingEvents.push(allEvents[i]);
        upcomingEvents.sort((x, y) => x.date.localeCompare(y.date));
    }
    else {        
    }
}

console.log(upcomingEvents);