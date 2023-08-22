// Load navbar content
fetch("partials/_navbar.html")
    .then(response => response.text())
    .then(navbarContent => {
        const navbarContainer = document.getElementById("navbar-container");
        navbarContainer.innerHTML = navbarContent;
    })
    .catch(error => console.error("Error loading navbar:", error));

// Load get in touch content
fetch("partials/_getintouch.html")
    .then(response => response.text())
    .then(footerContent => {
        const footerContainer = document.getElementById("getintouch");
        footerContainer.innerHTML = footerContent;
    })
    .catch(error => console.error("Error loading footer:", error));

// Load footer content
fetch("partials/_footer.html")
    .then(response => response.text())
    .then(footerContent => {
        const footerContainer = document.getElementById("footer-container");
        footerContainer.innerHTML = footerContent;
    })
    .catch(error => console.error("Error loading footer:", error));
