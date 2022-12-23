
document.querySelector('#profileForm').addEventListener('submit', collectAndSendData);
document.querySelector('#goToFeed').addEventListener('click', getAllUsers);

const endpoint = 'https://microbloglite.herokuapp.com/api/posts'
const loginData = JSON.parse(window.localStorage.getItem("login-data"))
const options = { 
    method: "GET",
    headers: {Authorization: `Bearer ${loginData.token}`},
};

let formJSON;
function collectAndSendData(evt) {
    console.log('Collecting data .........................');
    evt.preventDefault();
    const data = new FormData(evt.target);
    console.log(data.entries()); 
    formJSON = Object.fromEntries(data.entries());
    console.log(formJSON);
    setTimeout(postFormData, 300);
    setTimeout(getAllUsers, 500);
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

//instead of geetting all users use popfunctions instead
function getAllUsers() {
    fetch(endpoint,options)
    .then(response => response.json())
    .then(data => console.log(data))
}


