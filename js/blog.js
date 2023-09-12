document.addEventListener('DOMContentLoaded', function () {
    const blogPostContainer = document.getElementById("blogposts-container");

    function handleSinglePostClick(e) {
        if (e.target.classList.contains('single-post-button')) {
            const singlePostId = e.target.getAttribute('data-post-id');
            localStorage.setItem("single-post-id", singlePostId);
            location.assign('blogpage.html');
        }
    }

    blogPostContainer.addEventListener('click', handleSinglePostClick);

    fetch('https://osunstartuphubapi.pythonanywhere.com/api/blog/', {
        method: 'GET',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(result => {
            function formatBlogPost(singlePost) {
                return `
                <div class="col-lg-4" id="single-post">
                    <div class="imgwrap">
                        <img src="${singlePost.image}" alt="blogpost" class="img-fluid img-responsive">
                    </div>
                    <small>${singlePost.date_created_str}</small>
                    <h6>${singlePost.title}</h6>
                    <a class="single-post-link"><button class="single-post-button" data-post-id="${singlePost.id}">Read More</button></a>
                </div>`;
            }

            const blogPostData = result;
            const formattedBlogPosts = blogPostData.map(formatBlogPost).join('');
            blogPostContainer.innerHTML = formattedBlogPosts;
        })
        .catch(error => console.error('Error fetching data:', error));
});
