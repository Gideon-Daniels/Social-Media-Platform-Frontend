
myStorage = window.localStorage

function fetchUsers(){
    fetch("https://social-media-back-end.herokuapp.com/users/")
.then( res => res.json())
.then( res => {
    users = res.data
    console.log(users);
    
})
}

fetchUsers()

function login(){

    email = document.getElementById("email")
    password = document.getElementById("password")
    console.log(email.value, " ", password.value)
 
}