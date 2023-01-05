/* Global JavaScript found in Post and Profile Page*/

"use strict";

/* Functions */
export function popPosts(specificUser) {
  /* Scoped Variables */
  const postField = document.querySelector("#posts");
  const endpoint = "https://microbloglite.herokuapp.com/api/posts";
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));
  const options = { 
    method: "GET",
    headers: {Authorization: `Bearer ${loginData.token}`},
  };

  //Clear the html out of PostField
  postField.innerHTML = "";

    fetch(endpoint, options)
    .then(results => results.json())
    .then(data => {
      /* Filtering User's posts from server*/
        if (specificUser) data = data.filter(post => post.username == specificUser);
        
        /* Creates Post object in DOM */
        data.forEach(item => {
            const creationDate = new Date(item.createdAt);
            const likes = item.likes;
            const username = item.username;
            const postId = item._id;
            const postText = item.text;

            let card = document.createElement('div');
            card.id = "post";
            card.value = postId;
            
            let profileHeader = document.createElement('div');
            profileHeader.id = "profileHeader";
            card.appendChild(profileHeader);

            let userProfile = document.createElement('div');
            userProfile.id = "userProfile";
            profileHeader.appendChild(userProfile);

            let profilePicField = document.createElement('img');
            profilePicField.id = "profilePic";
            userProfile.appendChild(profilePicField);
            
            let usernameField = document.createElement('p');
            usernameField.id = "usernameField";
            usernameField.innerText = username;
            userProfile.appendChild(usernameField);
            
            let likeDiv = document.createElement('div');
            likeDiv.id = "likeDiv";
            profileHeader.appendChild(likeDiv);

            let likeIcon = document.createElement('img');
            likeIcon.id = "likeIcon";
            likeIcon.dataset.postid = postId
            likeIcon.src = "/img/like-icon.jpg";
            likeDiv.appendChild(likeIcon); 
            
            let likeCount = document.createElement('p')
            likeCount.id = "likeCount";
            likeCount.dataset.countpostid = postId
            likeCount.innerText = likes.length;
            likeDiv.appendChild(likeCount);
            
            let postTxt = document.createElement('p');
            postTxt.id = "postTxt";
            postTxt.innerText = postText;
            card.appendChild(postTxt);
            
            let timestamp = document.createElement('p');
            timestamp.id = "timestamp";
            // Aiming at 1:14 PM - 26 Feb 2019
            timestamp.innerText = getPostDate(creationDate);
            card.appendChild(timestamp);
            
            postField.insertBefore(card, postField.firstChild);
      });

      /* Scoped Variables */
      let likePosts = document.querySelectorAll("#likeIcon");
      
      /* Scoped Event Handlers */
      likePosts.forEach(post => {
      post.addEventListener("click", setLikeCounter);
        })

    });
}

function setLikeCounter(event) {
    updateLike(event.target.dataset.postid)
  }

function updateLike(postId) {
  /* Scoped Variables */
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
      })
    };

    fetch(likeEndpoint, likeOptions)
      .then((results) => results.json())
      .then((data) => {
        JSON.stringify(data);
        let counter = document.querySelector(`[data-countpostid="${postId}"]`)
       
        if (data.statusCode != 400) counter.innerText++;
      });
    
  }

  function getPostDate(date) {
  // Aiming at Formating like: "1:14 PM - 26 Feb 2019"

    /* Scoped Variables */
    let options = {
        hour12: true,
        hourCycle: "h12",
        hour:"numeric",
        minute:"numeric",

        day:"numeric",
        month: "short",
        year: "numeric",

    }  
     
    date = new Intl.DateTimeFormat('en', options).format(date).split(",");
    date = `${date[1]} ${date[0]} -${date[2]}`;

    return date;
}