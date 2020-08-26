$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const devices = JSON.parse(localStorage.getItem('devices')) || [];

const users = JSON.parse(localStorage.getItem('users')) || [];

// Use jquery to append device
devices.forEach(function(device) { 
    $('#devices tbody').append(`
    <tr> 
        <td>${device.user}</td> 
        <td>${device.name}</td>
    </tr>`
    ); 
});

// Use jquery to append user
users.forEach(function(user) { 
    $('#users tbody').append(`
    <tr> 
        <td>${user.userName}</td> 
        <td>${user.password}</td>
        <td>${user.confirmPassword}</td>
    </tr>`
    ); 
});

//Use Jqeury to add device
$('#add-device').on('click', function() { 
    const user = $('#user').val();
    const name = $('#name').val(); 
    devices.push({ user, name }); 
    localStorage.setItem('devices', JSON.stringify(devices));
    location.href = '/';
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

    //Check existed
    const exists = users.find((user) => { 
        return user.userName === userName;
    });

    if(exists) {
        alert ('This User has been registered'); 
    } else {
    if (password !== confirmPassword) {
        alert ('Please make sure that password and confirm password matched');
    } else {
    //Push and store username in to localStorgae
    users.push({ userName, password, confirmPassword }); 
    localStorage.setItem('users', JSON.stringify(users));
    location.href = 'device-history.html'
        }
    }
});

// Use Jquery to login
$('#login').on('click', function() { 
    const loginUserName = $('#loginUserName').val();
    const loginPassword = $('#loginPassword').val(); 

    //Check for existed userName
    const userNameExisted = users.find(user => { 
       if ( user.userName === loginUserName && user.password === loginPassword ) {
            return true;
       } else {
           return false;
       }
    });

    if (userNameExisted) {
        localStorage.setItem('isAthenticated', true);
        location.href = "/";
    }   else {
        alert ('You have put in the wrong user name or password');
    }

});

//Logout
const logout = () => { 
    localStorage.removeItem('isAuthenticated'); 
    location.href = '/login';
}



