
myStorage = window.localStorage

function login(){

    email = document.getElementById("email").value
    password = document.getElementById("password").value
   console.log(email,
    password)
fetch("https://social-media-back-end.herokuapp.com/users/",{
    method:"PATCH",
    body:JSON.stringify({
        email,
        password
    }),
    headers: {
        'content-type': 'application/json; charset=UTF-8',
    },
})
.then( res => res.json())
.then( res => {
    userData = res.data
    console.log(userData);
    if (!userData){
        document.querySelector("#error").innerHTML = "No user found with those creditials."
        return;
    }
    else{       
        localStorage.setItem("user", JSON.stringify(userData));
        window.location= "../html/landing.html"
    }
})
 
}