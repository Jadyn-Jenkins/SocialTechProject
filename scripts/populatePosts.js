
export function popPosts(specificUser) {
    const postField = document.querySelector('#posts');
    const endpoint = "https://microbloglite.herokuapp.com/api/posts";
    const loginData = JSON.parse(window.localStorage.getItem("login-data"))
    
    //Clear the html out of PostField
    postField.innerHTML = "";

    const options = { 
        method: "GET",
        headers: {Authorization: `Bearer ${loginData.token}`},
    };

    fetch(endpoint, options)
    .then(results => results.json())
    .then(data => {
        if (specificUser) data = data.filter(post => post.username == specificUser);
        console.trace(data)
   

  
        data.forEach(item => {
            const creationDate = item.createdAt;
            const likes = item.likes;
            const username = item.username;
            const postId = item._id;
            const postText = item.text;

            let card = document.createElement('div');
            card.id = "post";
            card.value = postId;
            
            let profilePicField = document.createElement('img');
            profilePicField.id = "profilePic";
            card.appendChild(profilePicField);
            
            let usernameField = document.createElement('p');
            usernameField.id = "usernameField";
            usernameField.innerText = username;
            card.appendChild(usernameField);
            
            let likeIcon = document.createElement('img');
            likeIcon.id = "likeIcon";
            // likeIcon.src = Place src to like icon here
            card.appendChild(likeIcon); 
            
            let likeCount = document.createElement('p')
            likeCount.id = "likeCount";
            likeCount.innerText = likes.length;
            card.appendChild(likeCount);
            
            let postTxt = document.createElement('p');
            postTxt.id = "postTxt";
            postTxt.innerText = postText;
            card.appendChild(postTxt);
            
            let timestamp = document.createElement('p');
            timestamp.id = "timestamp";
            timestamp.innerText = new Date(creationDate);
            card.appendChild(timestamp);
            
            postField.insertBefore(card, postField.firstChild);
        })
        // like button functionality      

 const likeEndpoint = "https://microbloglite.herokuapp.com/api/likes";
 const likeOptions = { 
    method: "POST",
    headers: {
        Authorization: `Bearer ${loginData.token}`,
        "Content-Type": `application/json; charset=utf-8`
    },
    body: JSON.stringify({
        postId: "63b45a525f3f1f9a69508923"
       
      }),

};
 fetch(likeEndpoint,likeOptions)
 .then(results => results.json())
 .then((data) => {
     console.log(data)
 
 
    setLikeCounter(data,id,likeCount)
 
 })
 function setLikeCounter(data,id, likeCount){
     const likedPost = data.find(
         (element) => element["id"] === id.innerText
     );
     if(typeof likedPost === "undefined"){
         likeCount.innerText = "0 likes";
     }else if (likedPost["likes"] === 1){
         likeCount.innerText = "1 like";
     }else {
         likeCount.innerText = `${likedPost["likes"]} likes`;
     }

    }

    });
 
}
    




