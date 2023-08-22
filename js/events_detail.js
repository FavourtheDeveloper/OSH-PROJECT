async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (response.status >= 200 && response.status < 300) {
            const result = await response.json();
            return result;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
}

const eventId = localStorage.getItem('event-id')

async function updatePageContent() {
    const url = `http://localhost:8000/events/detail/${eventId}/`;
    const result = await fetchData(url);

    if (result) {
        document.getElementById("event-title").innerHTML = result.title;
        document.getElementById("event-image").src = result.image;
        document.getElementById("event-description").innerHTML = result.description;
        document.getElementById("event-time").innerHTML = `<strong>Time: </strong>${result.start_time} - ${result.end_time}`;
        document.getElementById("event-location").innerHTML = `<strong>Location: </strong>${result.location}`;
    }
}

if (eventId !== null) {
    updatePageContent();
}

