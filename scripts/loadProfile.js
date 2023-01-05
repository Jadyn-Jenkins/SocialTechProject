
export const loginData = JSON.parse(window.localStorage.getItem("login-data"))
export function loadProfile() {
    const endpoint = `https://microbloglite.herokuapp.com/api/users/${loginData.username}`;

    const options = { 
        method: "GET",
        headers: {Authorization: `Bearer ${loginData.token}`},
    };

    fetch(endpoint, options)
    .then(results => results.json())
    .then(data => {   
        const profileImg = document.querySelector('#profileImg');
        // profileImg.src = image goes here
        document.querySelector('#profileName').innerText = data.username;
        document.querySelector('#profileBio').innerText = data.bio;
    })

}