export function loadProfile() {
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