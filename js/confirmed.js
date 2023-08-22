function printPage(url) {
    var printWindow = window.open(url, '_blank');
    printWindow.addEventListener('load', function () {
        printWindow.print();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    const confirmValue = queryParams.get("confirm");
    const uidValue = queryParams.get("uid");
    const eidValue = queryParams.get("eid");
    const eventId = localStorage.getItem('event-id');

    const ticketLinkButton = document.getElementById("ticket-link-button");

    fetch(`http://localhost:8000/events/confirm/${uidValue}/${eidValue}/`)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json(); // Parse response body as JSON
            }
            throw new Error(response.statusText);
        })
        .then(result => {
            localStorage.setItem("ticket-id", result.id);
            if (result.is_email_confirm) {
                ticketLinkButton.innerHTML =
                    `<a class="btn btn-block btn-warning" onclick="printPage('ticket.html')">
                        Print Ticket
                    </a>`;
            }
            console.log(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle error scenario, e.g., display an error message to the user
        });
});
