myStorage = window.localStorage
// ------------------------------functions for buttons---------------------------------
function logout(){
    window.location = '../html/login.html'
}
const user = JSON.parse(myStorage.getItem('user'))
console.log(user)
// --------------------------------USERS FUNCTIONALITY---------------------------------
let arrUsers=[]
function fetchUsers(){
    fetch("https://social-media-back-end.herokuapp.com/users/")
    .then( res => res.json())
    .then( res => {
        // console.log(res.data);
        arrUsers = res.data;
        showUsers(res.data)
        fetchPosts()
        fetchLocations()
      
        // instead of calling each function in the global scope , 
        // call other functions within the first function that is being executed 
        // so that the data is being pushed on to global variables gets its data pushed into the variable after 
        // the function is called and not before
    })
}

fetchUsers()

function showUsers(users){
    let container = document.querySelector("#users-container")
    container.innerHTML = "";
    users.forEach(user => {
        container.innerHTML += `
        <div class="user">
        <img src="${user.profile_picture}" alt="${user.user_id}">
        <h3 class="title">${user.name} ${user.surname}</h3>
        <div class="buttons">
            <button id="view-user" class="button" onclick="viewUser(${user.user_id});">VIEW</button>
        </div>
        </div>
        `;
    });
    console.log("Users",arrUsers);
}

function showUserLoggedIn(){
    let container = document.getElementById("profile")
    container.innerHTML =`
        <img src="${user.profile_picture}" alt="${user.id}">
        <h3 class="title">${user.name} ${user.surname}</h3>
    `;
}

showUserLoggedIn();

// --------------------------------POSTS FUNCTIONALITY-----------------------------
let arrPosts = []
function fetchPosts(){
    fetch("https://social-media-back-end.herokuapp.com/posts/")
    .then( res=> res.json())
    .then( res=> {
        arrPosts = res.data;
        displayPosts(res.data);
        findPosts();
    })
}

function displayPosts(posts){
    // Select container  
    let container = document.querySelector(".posts")
    // Clear container of old content 
    container.innerHTML = ""
    
    console.log("Posts",posts)
    
    // Loop over data and write to container
    posts.reverse().forEach(post => {
    
        let user = findUser(post.user_id)
        console.log(user);
        let datepublished = post.date_published
        let arrDateTime = datepublished.split(" ")
        container.innerHTML +=  `
    <div id="post">
            <div class='heading'>
                <img src=${user.profile_picture} alt="${post.user_id}">
                <div class="user-details">
                    <h3 class="title">${user.name} ${user.surname}</h3>
                    <h3 class="sub-title">${arrDateTime[0]}</h3>
                </div>
                <div class="post-buttons">
                    ${ loggedInUserButtons(post.user_id, post.post_id) }
                </div>
            </div>
            <div class="content"> 
                <h3 class="title">${post.title}</h3>             
                <p class="information">${post.content}</p>
            </div>                   
    </div>
        `
      
    });
}
// Function add buttons to the users posts , the user that is currently logged in.
function loggedInUserButtons(userId,postId){
    return user.user_id == userId ?
         `<button class="button" onclick=" showEditForm(${postId}); editPost(${postId},${userId});">Edit</button>
         <button  class="button" onclick="deletePost(${postId})">Delete</button>` : ''
}

function editPost(postId, user_id){
    let editPost = document.querySelector("#edit-form")
    
    // when event eventlistern submit is clicked it will post data to the backend
    editPost.addEventListener('submit', (e) => {
        e.preventDefault();
    
        let title = document.querySelector("#edit-post-title").value;
        let content = document.querySelector("#edit-post-content").value;
        console.log("Editor Id",user_id)
        console.log("Edit title",title)
        console.log("Edit content",content)
        console.log("PostId", postId)
        // Method to update title
        fetch(`https://social-media-back-end.herokuapp.com/post/${postId}`,{   
            method:"PUT",
            body:JSON.stringify({
                user_id,
                title,
    
            }),
            headers:{
                'content-type':'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            fetchPosts();
        })
        // Method to update content
        fetch(`https://social-media-back-end.herokuapp.com/post/${postId}`,{   
            method:"PUT",
            body:JSON.stringify({
                user_id,
                content,
    
            }),
            headers:{
                'content-type':'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            fetchPosts();
        })
        // toggle modal
        
        let container = document.querySelector("#modal-edit-post-container")
        container.classList.remove("show")
       
        // end of event listener
    });
        
    }


function deletePost(postId){

    fetch(`https://social-media-back-end.herokuapp.com/post/${postId}`,{
        method:"DELETE",
        headers:{
            'content-type':'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        }
    })
    .then( res=> res.json())
    .then( res=> {
        console.log(res)
        fetchPosts()
    })
}

function findUser(id){
    console.log(arrUsers)
    let user = arrUsers.find(user => {
        return user.user_id == id
    });
    return user
}

function findPosts(){
    // console.log(user.user_id)
    let id = user.user_id
    let usersPosts = arrPosts.filter(posts => {
        return posts.user_id == id
    });
    return usersPosts
}

// -------------------------------------------SEARCH FUNCTIONALITY--------------------------

function searchUser(){
    let searchTerm = document.querySelector("#search-user").value;
    let showError = document.querySelector("#user-search-error");
    console.log(searchTerm)
    // filter users array to check if user exists
    let userSearched = arrUsers.filter((user) =>{ /*dont need curly braces and return keyword since return state is one line */ 
     if( user.name.toLowerCase().includes(searchTerm.toLowerCase())){
        return user.name
    }    
     else if(user.surname.toLowerCase().includes(searchTerm.toLowerCase())){
        return user.surname
        } /*Returns user with the name that include name from input*/
    });
    // condition to check if usersSearched lenght is greater then 0 and to check if input is empty
    showError.innerHTML = "";
    if (userSearched.length == 0){
        showError.innerHTML = "User does not exists"
    }
    else if (searchTerm === "") {
        showError.innerHTML = "Input is empty"
    } 
    else{
        showUsers(userSearched)
    }
}

function searchPost(){
    let searchTerm = document.querySelector("#search-post").value 
    let showError = document.querySelector("#post-search-error")
    console.log(searchTerm)

    // filter over posts
    let postSearched = arrPosts.filter( (post) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    showError.innerHTML = "";
    if (postSearched.length == 0){
        showError.innerHTML = "Post does not exists"
    }
    else if (searchTerm === "") {
        showError.innerHTML = "Input is empty"
    } 
    else{
        displayPosts(postSearched)
    }
}

function resetPosts(){
    document.querySelector("#post-search-error").innerHTML = ""
    displayPosts(arrPosts.reverse())
}

function resetUsers(){
    document.querySelector("#user-search-error").innerHTML = ""
    showUsers(arrUsers)
}

// ---------------------------------ADD POST FUNCTIONALITY-----------------------------

let createPost = document.querySelector("#create-post");

createPost.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.querySelector("#post-title").value;
    let content = document.querySelector("#post-content").value;
    let user_id = user.user_id
    addPost(user_id, title, content)
});

function addPost(user_id, title, content){
    fetch("https://social-media-back-end.herokuapp.com/posts/",{   
        method:"POST",
        body:JSON.stringify({
            user_id,
            title,
            content
        }),
        headers:{
            'content-type':'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        }
    })
    .then(res => res.json())
    .then(res => {
        setTimeout(function(){
            modalContainer.classList.remove("show")
        },1000)
        fetchPosts()
    })
}

// ---------------------------------LOCATIONS FUNCTIONALITY-----------------------------
arrLocations = []
function fetchLocations(){
    fetch("https://social-media-back-end.herokuapp.com/locations/")
    .then( res => res.json())
    .then( res => {
        arrLocations = res.data
    }) 
}

// -------------------------------Modal functionality------------------------

let open = document.querySelector("#open");
let modalContainer = document.querySelector("#modal-container");
let close = document.querySelector("#close");

open.addEventListener('click', ()=> {
    modalContainer.classList.add("show")
});

close.addEventListener('click',(e)=> {
    modalContainer.classList.remove("show")
});



// ----------------------------VIEW USER MODAL----------------------//


function viewUser(id){
    let modalContainer = document.querySelector(".modal-user")

        let user_ = arrUsers.find( (user) => user.user_id == id);
        console.log(user_)
        let location_ = arrLocations.find( (location) => location.location_id == id);
        console.log(location_)
        modalContainer.innerHTML = "";
        modalContainer.innerHTML += `
                    <span id="close-user" onclick="toggleModal()" class="close-user">x</span>
                    <img src="${user_.profile_picture}" alt="">
                    
                        <h3 class="fullname">${user_.name} ${user_.surname}</h3>
                        <h3 class="email">${user_.email}</h3>
                        <h3 class="suburb">${location_.suburb}</h3>
                        <h3 class="province">${location_.province}</h3>
                    
        `
    toggleModal()

}

function toggleModal(){
    document.querySelector("#modal-user-container").classList.toggle("show")
}
// -------------------------------Edit Post Modal--------------------------//

function showEditForm(post_id){
    console .log("Form Created", post_id)
    let post = arrPosts.find( post => post.post_id == post_id
    );
    console.log("Post found",post)
    let container = document.querySelector("#modal-edit-post-container")
    container.innerHTML = "";
    container.classList.add("show")
    container.innerHTML +=  `
    <form id="edit-form">
    <h2 class="heading"><span>Edit Post</span></h2>
        <div class="inputs">
            <span class="remove-edit-modal">X</span>
            <input id="edit-post-title" class="title" required type="text" value="${post.title}">
            <textarea  id="edit-post-content" class="content" name="content" required>${post.content}</textarea>
        </div>
        <div class="buttons">
            <button class="button" type="submit">Submit</button>
        </div>
    </form>
    `
    let removeContainer = document.querySelector(".remove-edit-modal");
    console.log("RemoveContainer", removeContainer)
    removeContainer.addEventListener('click', ()=>{
        container.classList.toggle("show")
    })

}


