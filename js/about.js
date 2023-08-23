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

async function updatePageContent() {
    const url = 'https://osunstartuphubapi.pythonanywhere.com/api/about/';
    const result = await fetchData(url);

    if (result) {
        document.getElementById("about-hero-image").src = `https://osunstartuphubapi.pythonanywhere.com${result.banner}`;
        document.getElementById("main-text-container").innerHTML = result.main_text;
        document.getElementById("vision-text-container").innerHTML = result.vision;
        document.getElementById("mission-text-container").innerHTML = result.mission;
        document.getElementById("objective-text-container").innerHTML = result.objective;
        document.getElementById("location-text-container").innerHTML = result.location;
        document.getElementById("mail-text-container").innerHTML = result.email;
    }
}

updatePageContent();
