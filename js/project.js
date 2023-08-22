const projectContainer = document.getElementById("project-container");

projectContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('project-button')) {
        const singleProjectId = e.target.getAttribute('data-project-id');
        localStorage.setItem("single-project-id", singleProjectId);
        console.log(localStorage.getItem("single-project-id"));
        location.assign('project_detail.html');
    }
});

function handleCommonError(error) {
    console.error("An error occurred:", error);
    return null;
}

// Fetch and set project banner image
fetch('http://localhost:8000/projects/page-banner/')
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        return Promise.reject(new Error(response.statusText));
    })
    .then(result => {
        document.getElementById("project-banner-image").src = `http://localhost:8000${result.image}`;
    })
    .catch(handleCommonError);

// Fetch and format project data
fetch('http://localhost:8000/projects/')
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        return Promise.reject(new Error(response.statusText));
    })
    .then(result => {
        const projects = result;
        let finishedProject = ""; // Use let instead of var
        for (let i = 0; i < projects.length; i++) {
            const formattedProject = i % 2 !== 0 ? formatImageLeft(projects[i]) : formatImageRight(projects[i]);
            finishedProject += formattedProject;
        }
        projectContainer.innerHTML = finishedProject;
    })
    .catch(handleCommonError);

function formatImageLeft(project) {
    return `        <div class="col-lg-8">
            <img src="${project.image}" class="img-responsive img-fluid">
        </div>

        <div class="col-lg-4">
            <h1>${project.title}</h1>
            <p>${project.snippet}</p>
            <button>Learn More</button>
        </div>`
}

function formatImageRight(project) {
    return `<div class="col-lg-4">
        <h1>${project.title}</h1>
        <p>${project.snippet}</p>
        <button class="project-button" data-project-id="${project.id}">Learn More</button>
      </div>

      <div class="col-lg-8">
        <img src="${project.image}" class="img-responsive img-fluid">
      </div>`
}