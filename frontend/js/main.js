document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
    } else {
        alert('Login failed: ' + data.message);
    }
});

document.getElementById('book-now').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to book a workspace');
        return;
    }

    const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ workspaceId: 1, startTime: new Date(), endTime: new Date(new Date().getTime() + 60 * 60 * 1000) })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Booking successful!');
    } else {
        alert('Booking failed: ' + data.message);
    }
});
