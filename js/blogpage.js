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

var singlePostId = localStorage.getItem("single-post-id", singlePostId);


async function updatePageContent() {
    const url = `http://localhost:8000/blog/detail/${singlePostId}`;
    const result = await fetchData(url);

    if (result) {
        document.getElementById('blog-image-container').innerHTML = `<img src="${result.image}" alt="BlogImg" class="img-fluid img-responsive">`;
        document.getElementById('blog-title-container').innerHTML = result.title;
        document.getElementById('blog-text-container').innerHTML = result.content;
    }
}

if (singlePostId !== null) {
    updatePageContent();
}

