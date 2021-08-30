fetch("https://social-media-back-end.herokuapp.com")
.then( res => res.json())
.then( res => {
    console.log(res);
})