
myStorage = window.localStorage
// --------------------------------LOGIN Functionality------------------------------//
let user = {}
function login(){
    email = document.getElementById("email").value
    password = document.getElementById("password").value
   console.log("email:",email," Password:",password)
//    Patch fetches users data or returns data=null
fetch("https://social-media-back-end.herokuapp.com/users/",{
    method:"PATCH",
    body:JSON.stringify({
        email,
        password,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
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
        window.location= "../html/home.html"
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
    let city = document.getElementById('city').value
    let province = document.getElementById("province").value;
    let profile_picture = "https://i.postimg.cc/7YhzgVSV/15776751-983806971723354-3851030956199859639-o.jpg"
    // register details
    registerLocation(address, suburb, postalCode, city, province);
    registerBasicDetails(names, surname, email, password, profile_picture);

}

function registerBasicDetails(name, surname, email, password, profile_picture){
    fetch("https://social-media-back-end.herokuapp.com/users/",{
        // mode: "no-cors",    
        method:"POST",
        body:JSON.stringify({
            name,
            surname,
            email,
            password,
            profile_picture
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

function registerLocation(address, suburb, postal_code, city, province){
    fetch("https://social-media-back-end.herokuapp.com/locations/",{   
        method:"POST",
        body:JSON.stringify({
            address,
            suburb,
            postal_code,
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



