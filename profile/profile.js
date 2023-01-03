import { loadProfile, loginData } from "/scripts/loadProfile.js";
import { popPosts } from "/scripts/populatePosts.js";

document.querySelector('#profileForm').addEventListener('submit', collectAndSendData);
document.querySelector('#goToFeed').addEventListener('click', () =>  window.location.assign("/posts"));
window.onload = () => {
    loadProfile();
    popPosts(loginData.username);
};

let formJSON;
const endpoint = 'https://microbloglite.herokuapp.com/api/posts'

function collectAndSendData(evt) {
    evt.preventDefault();
   
    const data = new FormData(evt.target);
    formJSON = Object.fromEntries(data.entries());
    
    setTimeout(postFormData, 300);
    setTimeout(() => {popPosts(loginData.username)}, 500);
}

function postFormData() {
    fetch(endpoint,{
        method: "POST",
        body: JSON.stringify(formJSON),
        headers:{"Content-type": "application/json; charset=UTF-8", Authorization: `Bearer ${loginData.token}`}
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        console.log(error);
        'Unexpected Error';
    })
}