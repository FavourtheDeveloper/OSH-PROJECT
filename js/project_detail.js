const projectImageContainer = document.getElementById('project-image-container');
const projectTitleContainer = document.getElementById('project-title-container');
const projectTextContainer = document.getElementById('project-text-container');

const singleProjectId = localStorage.getItem("single-project-id");

if (singleProjectId !== null) {
    const projectDetailUrl = `http://localhost:8000/projects/detail/${singleProjectId}/`;

    fetch(projectDetailUrl)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(result => {

            projectImageContainer.innerHTML = `<img src="${result.image}" alt="BlogImg" class="img-fluid img-responsive">`;
            projectTitleContainer.innerHTML = result.title;
            projectTextContainer.innerHTML = result.content;

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
