/* Global JavaScript found in Post and Profile Page*/

"use strict";

/* Global Variables */
export const loginData = JSON.parse(window.localStorage.getItem("login-data"))

/* Functions */
export function loadProfile() {
    /* Scoped Variables */
    const endpoint = `https://microbloglite.herokuapp.com/api/users/${loginData.username}`;
    const GEToptions = { 
        method: "GET",
        headers: {Authorization: `Bearer ${loginData.token}`},
    };

    fetch(endpoint, GEToptions)
    .then(results => results.json())
    .then(data => {   
        const profileImg = document.querySelector('#profileImg');
        // profileImg.src = image goes here
        document.querySelector('#profileName').innerText = data.username;
        document.querySelector('#profileBio').innerText = data.bio;
    })

}