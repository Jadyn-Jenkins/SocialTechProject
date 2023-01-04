
let onlineUsesr = document.getElementById('onlineUsesr');
console.log(onlineUsesr);
// export function showOnlinePerson() {
//     console.log('function displayOnlineUsers is working ................');
// }





export function showOnlinePerson() {
    const endpoint = "https://microbloglite.herokuapp.com/api/";
    const loginData = JSON.parse(window.localStorage.getItem("login-data"));
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${loginData.token}` },
    };
    fetch(endpoint +`posts?limit=1000`, options)
      .then((results) => results.json())
      .then((data) => {
        data.forEach(arrItem => {
            console.log(arrItem);
            
        });
    });
}