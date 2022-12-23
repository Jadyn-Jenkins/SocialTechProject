//JADYN- My idea on how the profile should be set up

/* <section id="profile">
        <div id="profileDiv">
          <img id="profileImg">profile Image goes here</img>
          <p id="profileName">profile name goes here</p>
            
          <p id="profileBio">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Eaque quis inventore ab dolores! Dicta mollitia esse 
            earum illo fugit unde voluptatibus hic sunt sint, sequi 
            porro voluptatem, tempore laborum officiis?</p>
        </div>
        <button id="goToFeed">Go to Feed</button>
      </section> */


loadProfile();
function loadProfile() {
    const loginData = JSON.parse(window.localStorage.getItem("login-data"))
    const endpoint = `https://microbloglite.herokuapp.com/api/users/${loginData.username}`;

    const options = { 
        method: "GET",
        headers: {Authorization: `Bearer ${loginData.token}`},
    };

    fetch(endpoint, options)
    .then(results => results.json())
    .then(data => {
        console.trace(data)
  /* {
        fullName: 'Jadyn Jenkins', 
        username: 'jadyn_jenkins', 
        bio: 'Jadyn Rocks', 
        createdAt: '2022-12-20T18:09:20.513Z', 
        updatedAt: '2022-12-20T19:35:46.099Z'
    } */
    
        const profileImg = document.querySelector('#profileImg');
        // profileImg.src = image goes here
        const username = document.querySelector('#profileName');
        username.innerText = data.username;
        const bio = document.querySelector('#profileBio');
        bio.innerText = data.bio;
    })

}