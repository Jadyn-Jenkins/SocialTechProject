import { loadProfile, loginData } from "/scripts/loadProfile.js";
import { popPosts } from "/scripts/populatePosts.js";

let formJSON;
const endpoint = 'https://microbloglite.herokuapp.com'
const postsLocation = '/api/posts'
const updateUserLocation = '/api/users/'

const updateForm = document.querySelector('#updateAccountForm');
let localData = JSON.parse(window.localStorage.getItem("login-data"));

document.querySelector('#profileForm').addEventListener('submit', collectAndSendData);
document.querySelector('#goToFeed').addEventListener('click', () =>  window.location.assign("/posts"));
document.querySelector('#updateLink').addEventListener('click', showUpdateFields)
updateForm.addEventListener('submit', updateAccount) 

window.onload = () => {
    loadProfile();
    popPosts(loginData.username);
};

function collectAndSendData(evt) {
    evt.preventDefault();
   
    const data = new FormData(evt.target);
    formJSON = Object.fromEntries(data.entries());
    
    setTimeout(postFormData, 300);
    setTimeout(() => {popPosts(loginData.username)}, 500);
}

function postFormData() {
    fetch(`${endpoint}${postsLocation}`,{
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

/*  {
    "password": "string",
    "bio": "string",
    "fullName": "string"
    }
*/
function showUpdateFields(){
    updateForm.hidden = false;
}

function updateAccount(evt) {
    evt.preventDefault();
    
    
   
    const data = {
        bio: evt.target.bio.value,
        fullName: evt.target.fullName.value,
        password: evt.target.password.value,
      };
      evt.target.updateBtn.disabled = true;
      postAccountUpdateToServer(data)
/*     
    const data = new FormData(evt.target);
    formJSON = Object.fromEntries(data.entries());
 */
}

function postAccountUpdateToServer(updateAccountData) {
    fetch(`${endpoint}${updateUserLocation}${localData.username}`,{
        method: "PUT",
        body: JSON.stringify({
            bio: updateAccountData.bio,
            fullName: updateAccountData.fullName,
            password: updateAccountData.password,
          }),
        headers:{"Content-type": "application/json; charset=UTF-8", Authorization: `Bearer ${loginData.token}`},
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        console.log(error);
        'Unexpected Error';
    })

    updateForm.hidden = true;
    setTimeout(() => location.reload(), 500)
}