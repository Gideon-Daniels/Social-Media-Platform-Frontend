myStorage = window.localStorage
// ------------------------------functions for buttons---------------------------------
function logout(){
    window.location = '../html/login.html'
}
const user = JSON.parse(myStorage.getItem('user'))
console.log(user)
// --------------------------------USERS FUNCTIONALITY---------------------------------
arrUsers=[]
function fetchUsers(){
    fetch("https://social-media-back-end.herokuapp.com/users/")
    .then( res => res.json())
    .then( res => {
        // console.log(res.data);
        showUsers(res.data)
    })
}
function showUsers(users){
    let container = document.querySelector("#users-container")
    container.innerHTML = "";
    users.forEach(user => {
        arrUsers.push(user)
        container.innerHTML += `
        <img src="${user.profile_picture}" alt="${user.user_id}">
        <h3 class="title">${user.name} ${user.surname}</h3>
        <div class="buttons">
            <button class="button">VIEW</button>
        </div>
        `;
    });
    console.log("Users",arrUsers);
}

fetchUsers()

function showUserLoggedIn(){
    let container = document.getElementById("profile")
    console.log(container)
    console.log(user)
    container.innerHTML =`
        <img src="${user.profile_picture}" alt="${user.id}">
        <h3 class="title">${user.name} ${user.surname}</h3>
    `;

}

showUserLoggedIn();

// --------------------------------POSTS FUNCTIONALITY-----------------------------
arrPosts = []
function fetchPosts(){
    fetch("https://social-media-back-end.herokuapp.com/posts/")
    .then( res=> res.json())
    .then( res=> {
        console.log(res.data)
        displayPosts(res.data)
    })
}
fetchPosts()

function displayPosts(posts){
    let container = document.querySelector(".posts")
    container.innerHTML = ""
    posts.forEach(post => {
        arrPosts.push(post)
        let datepublished = post.date_published
        let arrDateTime = datepublished.split(" ")
        console.log(arrDateTime)
        container.innerHTML =  `
    <div id="post">
            <img src="" alt="${post.user_id}">
            <div class="posted">
                <h3 class="title">${post.title}</h3>
                <h3 class="sub-title">${arrDateTime[0]}</h3>
                <p class="content">${post.content}</p>
            </div>                   
    </div>
        `
    });
    console.log("Array",arrPosts)
}

// ---------------------------------LOCATIONS FUNCTIONALITY-----------------------------
function fetchLocations(){
    fetch("https://social-media-back-end.herokuapp.com/locations/")
    .then( res => res.json())
    .then( res => {
        console.log(res);
    })
}
