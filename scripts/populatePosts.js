export function popPosts(specificUser) {
  const postField = document.querySelector("#posts");
  const endpoint = "https://microbloglite.herokuapp.com/api/posts";
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));

  //Clear the html out of PostField
  postField.innerHTML = "";

  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${loginData.token}` },
  };

  fetch(endpoint, options)
    .then((results) => results.json())
    .then((data) => {
         if (specificUser)
        data = data.filter((post) => post.username == specificUser);
      console.trace(data);

      data.forEach((item) => {
        const creationDate = item.createdAt;
        const likes = item.likes;
        const username = item.username;
        const postId = item._id;
        const postText = item.text;

        let card = document.createElement("div");
        card.id = "post";
        card.value = postId;

        let profilePicField = document.createElement("img");
        profilePicField.id = "profilePic";
        card.appendChild(profilePicField);

        let usernameField = document.createElement("p");
        usernameField.id = "usernameField";
        usernameField.innerText = username;
        card.appendChild(usernameField);

        let likeIcon = document.createElement("img");
        likeIcon.id = "likeIcon";
        likeIcon.dataset.postid = postId
        likeIcon.src = "/img/like-icon.jpg";
        card.appendChild(likeIcon);

        let likeCount = document.createElement("p");
        likeCount.id = "likeCount";
        likeCount.dataset.countpostid = postId
        likeCount.innerText = likes.length;
        card.appendChild(likeCount);

        let postTxt = document.createElement("p");
        postTxt.id = "postTxt";
        postTxt.innerText = postText;
        card.appendChild(postTxt);

        let timestamp = document.createElement("p");
        timestamp.id = "timestamp";
        timestamp.innerText = new Date(creationDate);
        card.appendChild(timestamp);

        postField.insertBefore(card, postField.firstChild);
      });
      let likePosts = document.querySelectorAll("#likeIcon");
      likePosts.forEach(post => {
      post.addEventListener("click", setLikeCounter); 
      }) 
      
    });
}
// like button functionality
function setLikeCounter(event) {
    console.log("button is working",event.target.dataset.postid);
     
    let updatedLike = updateLike(event.target.dataset.postid)

  }

function updateLike(postId) {
    const loginData = JSON.parse(window.localStorage.getItem("login-data"));

    const likeEndpoint = "https://microbloglite.herokuapp.com/api/likes";

    const likeOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
        "Content-Type": `application/json; charset=utf-8`,
      },
      body: JSON.stringify({
        postId: postId
        
      }),
    };

     return fetch(likeEndpoint, likeOptions)
      .then((results) => results.json())
      .then((data) => {
        console.log(data);
        JSON.stringify(data);
        let counter = document.querySelector(`[data-countpostid="${postId}"]`)
       
        if (data.statusCode != 400) {
            
        counter.innerText++
        }
      });
    
  }



