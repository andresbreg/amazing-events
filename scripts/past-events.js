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

console.log(pastEvents);