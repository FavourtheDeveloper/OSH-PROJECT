const eventContainer = document.getElementById("event-card-container");

function formatEvent(singleEvent) {
    return `
        <div class="event-card-div col-lg-6 col-sm-12">
            <div class="card text-light">
                <div class="image-container">
                    <img src="${singleEvent.image}" class="card-img" alt="...">
                    <div class="dark-overlay"></div>
                </div>
                <div event-card-id="${singleEvent.id}" class="card-img-overlay">
                    <h5 class="card-title">${singleEvent.title}</h5>
                    <p class="card-text"><small>${singleEvent.start_time}</small></p>
                </div>
            </div>
        </div>`;
}
function handleEventData(result) {
    const eventData = result;
    const formattedEventData = eventData.map(formatEvent).join('');
    eventContainer.innerHTML = formattedEventData;
}


// Handle click on event card overlay
function handleEventCardClick(e) {
    if (e.target.classList.contains('card-img-overlay')) {
        const eventId = e.target.getAttribute('event-card-id');
        localStorage.setItem('event-id', eventId);
        location.assign('events_detail.html');
    }
}

eventContainer.addEventListener('click', handleEventCardClick);

// Fetch and display events
fetch('https://osunstartuphubapi.pythonanywhere.com/api/events/', {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json(); // Parse response body as JSON
        }
        throw new Error(response.statusText);
    })
    .then(result => { handleEventData(result) })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error scenario, e.g., display an error message to the user
    });


