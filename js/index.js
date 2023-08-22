fetch("http://localhost:8000/")
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(data => {
        updateHomeShowcase(data.hero_text, data.hero_image);
        updateCarousel(data.index_carousel_data);
        updateHomeTeam(data.team_text, data.team_image);
        updateHomeOrg(data.section_3_text, data.section_3_image);
    })
    .catch(error => console.error('Error fetching data:', error));

function updateContainerText(container, text) {
    if (container) {
        container.innerHTML = text;
    }
}

function updateContainerImage(container, image) {
    if (container) {
        container.innerHTML = `<img src="http://localhost:8000${image}" alt="OSH Team icon" class="img-responsive img-fluid">`;
    }
}

function updateHomeShowcase(text, image) {
    updateContainerText(document.getElementById('homeshowcase-text-container'), text);
    updateContainerImage(document.getElementById('homeshowcase-image-container'), image);
}

function updateCarousel(carouselData) {
    const carouselItemContainer = document.getElementById("carousel-item-container");
    const formattedData = carouselData.map((item, index) => formatCarouselItem(item, index === 0)).join('');
    carouselItemContainer.innerHTML = formattedData;
}

function formatCarouselItem(item, isActive) {
    return `
    <div class="carousel-item ${isActive ? 'active' : ''}">
      <img class="d-block w-100 h-10" src="http://localhost:8000${item.file}" alt="OSSH Carousel Image">
      <div class="carousel-caption d-md-block">
        <h5>${item.text}</h5>
        <button>Join Now</button>
      </div>
    </div>`;
}

function updateHomeTeam(text, image) {
    updateContainerText(document.getElementById('hometeam-text-container'), text);
    updateContainerImage(document.getElementById('hometeam-image-container'), image);
}

function updateHomeOrg(text, image) {
    updateContainerText(document.getElementById('home-text'), text);
    updateContainerImage(document.getElementById('homeorg-image-container'), image);
}
