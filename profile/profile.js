
// const loginData = JSON.parse(window.localStorage.getItem("login-data"))
//     const options = { 
//         method: "GET",
//         headers: {Authorization: `Bearer ${loginData.token}`},
//     };

//     fetch(endpoint, options)


let postElement = document.getElementById('post');
console.log(postElement);

postElement.addEventListener('submit', collectAndSendData);

function collectAndSendData(evt) {
    console.log('Collecting data .........................');
    
}

// function getAndSendData(evt) {
//     evt.preventDefault();
//     const data = new FormData(evt.target);
//     console.log(data.entries());   // transform a list to key value pairs
//     formJSON = Object.fromEntries(data.entries());
//     console.log(formJSON);
//    postData(); 
// }