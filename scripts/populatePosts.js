
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
            const creationDate = new Date(item.createdAt);
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
            // Aiming at 1:14 PM - 26 Feb 2019
            timestamp.innerText = getPostDate(creationDate);
            card.appendChild(timestamp);
            
            postField.insertBefore(card, postField.firstChild);
        })
    });
}

function getPostDate(date) {
    // Aiming at 1:14 PM - 26 Feb 2019
    
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
    // ['Jan 1', ' 2023', ' 12:31 PM']
    date = `${date[1]} ${date[0]} -${date[2]}`;
    return date;
}