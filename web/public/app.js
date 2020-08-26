$('#navbar').load('navbar.html');
$('#footer').load('footer.html');


const users = JSON.parse(localStorage.getItem('users')) || [];

const API_URL = 'http://localhost:5000/api';

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

// Use jquery to append user
const response 
users.forEach(function(user) { 
    $('#users tbody').append(`
    <tr> 
        <td>${user.userName}</td> 
        <td>${user.password}</td>
        <td>${user.confirmPassword}</td>
    </tr>`
    ); 
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
    console.log(`command is: ${command}`);
});

//Use Jqeury to register 
$('#register').on('click', function() { 
    const userName = $('#userName').val();
    const password = $('#userPassword').val(); 
    const confirmPassword = $('#userConfirmPassword').val();

    if (password !== confirmPassword) {
        alert ('Please make sure that password and confirm password matched');
    } else {
    //Push and store username in to localStorgae
        $.post(`${API_URL}/registration`, { userName, password})
        .exec()
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
    $.post(`${API_URL}/authenticate`, { loginUser, loginPassword }) 
    .then((response) => {
        if (response.success) {
            localStorage.setItem('user', loginUser); 
            localStorage.setItem('isAdmin', response.isAdmin); 
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
}



