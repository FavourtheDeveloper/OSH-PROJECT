document.addEventListener('DOMContentLoaded', function () {

    const eventId = localStorage.getItem('event-id')
    if (eventId !== null) {
        fetch(`https://osunstartuphubapi.pythonanywhere.com/api/events/detail/${eventId}/`, {
            method: 'GET',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                }
                return Promise.reject(new Error(response.statusText));
            })
            .then(response => response.json())
            .then(result => {
                document.getElementById("event").value = result.title;
                document.getElementById("id_event").value = result.id;
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const eventHeader = document.getElementById("event-header");
    const registrationForm = document.getElementById("registration-form");

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault()

        registrationForm.hidden = true;
        eventHeader.innerHTML = "Loading...";

        const csrfToken = getCookie('csrftoken');
        const formData = new FormData(e.target);
        let formDataDictionary = {}

        for (var pair of formData.entries()) {
            formDataDictionary[pair[0]] = pair[1];
        }

        var data = JSON.stringify(formDataDictionary)
        const registrationUrl = 'https://osunstartuphubapi.pythonanywhere.com/api/events/register/';
        const alertContainer = document.getElementById('alert-container');

        fetch(registrationUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: data,
        })
            .then(response => {
                if (response.status === 202) {
                    localStorage.setItem('reg-status', 'true');
                } else if (response.status === 200) {
                    localStorage.setItem('reg-status', 'false');
                }

                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(result => {
                eventHeader.hidden = true;
                localStorage.setItem('email', result.email_address);

                const regStatus = localStorage.getItem('reg-status');
                const alert = document.createElement('div');
                alert.className = 'alert alert-dismissible fade show';
                if (regStatus === 'true') {
                    alert.classList.add('alert-success');
                    alert.innerHTML = `
                    Registration successful! A confirmation link has been sent to your email address
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                `;
                } else if (regStatus === 'false') {
                    alert.classList.add('alert-danger');
                    alert.innerHTML = `
                    Registration Failed! The email address might already be in use
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                `;
                }

                alertContainer.innerHTML = '';
                alertContainer.appendChild(alert);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    })
});
