$('#navbar').load('navbar.html');
$('#footer').load('footer.html');


const API_URL = 'http://localhost:5000/api';


const currentUser = localStorage.getItem('user');

    if (currentUser) { 
        $.get(`${API_URL}/users/${currentUser}/devices`) 
        .then(response => {
                response.forEach((device) => { 
                    $('#devices tbody').append(`
                    <tr data-device-id=${device._id}> 
                        <td>${device.user}</td> 
                        <td>${device.name}</td>
                    </tr>`
                ); 
            });
            $('#devices tbody tr').on('click', (e) => {
                const deviceId = e.currentTarget.getAttribute('data-device-id'); 
                $.get(`${API_URL}/devices/${deviceId}/device-history`) .then((response) => {
                  response.map(sensorData => { 
                    $('#historyContent').append(`
                  <tr>
                  <td>${sensorData.ts}</td> 
                  <td>${sensorData.temp}</td> 
                  <td>${sensorData.loc.lat}</td> 
                  <td>${sensorData.loc.lon}</td>
                  </tr>`);
                  }); 
                  $('#historyModal').modal('show');
                });
              });
        })
        .catch(error => {error});
    } else {
    const path = window.location.pathname; 
    if (path !== '/login') {
        location.href = '/login';
        }
    }

// Use jquery to append device
const response = $.get(`${API_URL}/devices`) 
    .then(response => {
        response.forEach(device => { 
        $('#devices tbody').append(`
            <tr> 
                <td>${device.user}</td> 
                <td>${device.name}</td>
            </tr>`
            ); 
        });
    }) 
    .catch(error => {
        console.error(`Error: ${error}`); 
});

//add device
$('#add-device').on('click', () => { 
    const name = $('#name').val(); 
    const user = $('#user').val(); 
    const sensorData = [];

    const body = {
    name,
    user,
    sensorData
  };

    $.post(`${API_URL}/devices`, body) 
    .then(response => {
        location.href = '/'; 
    })
    .catch(error => { 
        console.error(`Error: ${error}`);
    }); 
});

//Use Jqeury to send command
$('#send-command').on('click', function() { 
    const command = $('#command').val(); 
    const deviceId = $('#deviceId').val();

    console.log(`command is: ${command}`);
    console.log(`deviceId is: ${deviceId}`);
});

// register 
$('#register').on('click', () => { 
    const userName = $('#userName').val();
    const password = $('#userPassword').val(); 
    const confirmPassword = $('#userConfirmPassword').val();

    if (password !== confirmPassword) {
        alert ('Please make sure that password and confirm password matched');
    } else {
        $.post(`${API_URL}/registration`, { 
            name: userName, 
            password: password,
        })
        .then(result => {
            if (result.success) {
                location.href = '/login';
            } else {
                alert ('Register fail');
            }
        });
        };
});

// Use Jquery to login
$('#login').on('click', () => {
    const loginUser = $('#loginUserName').val();
    const loginPassword = $('#loginPassword').val(); 
    $.post(`${API_URL}/authenticate`, { name: loginUser , password: loginPassword }) 
    .then((response) => {
        if (response.success) {
            localStorage.setItem('user', loginUser);  
            location.href = '/';
        } else {
            $('#message').append(`<p class="alert alert-danger">${response}
        </p>`); 
        }
    }); 
});

//Logout
const logout = () => { 
    localStorage.removeItem('isAuthenticated'); 
    location.href = '/login';
};


