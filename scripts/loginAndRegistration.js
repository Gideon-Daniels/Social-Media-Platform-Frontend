
myStorage = window.localStorage
// --------------------------------LOGIN Functionality------------------------------//
let user = {}
let locationLength = 0;
function login(){
    email = document.getElementById("email").value
    password = document.getElementById("password").value
   console.log("username:",email," Password:",password)
//    Patch fetches users data or returns data=null
fetch("https://social-media-back-end.herokuapp.com/users",{
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
    user = userData
    console.log(userData);
    // error messaged displayed when user data is empty
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

function registration(){

    // get basic details
    let names = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    // get location details
    let address = document.getElementById("address").value;
    let suburb = document.getElementById("suburb").value;
    let postalCode = document.getElementById("postal-code").value;
    let province = document.getElementById("province").value;
    
    // register details
    registerLocation(address, suburb, postalCode, province);
    registerBasicDetails(names, surname, email, password);

}

function registerBasicDetails(name, surname, email, password){
    fetch("https://social-media-back-end.herokuapp.com/users/",{
        // mode: "no-cors",    
        method:"POST",
        body:JSON.stringify({
            name,
            surname,
            email,
            password,
        }),
        headers:{
            'content-type':'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })
}

function registerLocation(address, suburb, postalCode, city, province){
    fetch("https://social-media-back-end.herokuapp.com/users/",{
        // mode: "no-cors",    
        method:"POST",
        body:JSON.stringify({
            address,
            suburb,
            postalCode,
            city,
            province
        }),
        headers:{
            'content-type':'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })
}



