fetch('http://localhost:8000/foundry/')
    .then(response => {
        // network failure, request prevented
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }


        return Promise.reject(new Error(response.statusText));
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById("foundry-banner-image").src = `http://localhost:8000${result.banner}`
        document.getElementById("foundry-content-container").innerHTML = result.content
    })
    .catch(error => {
        // common error
        return null;
    });