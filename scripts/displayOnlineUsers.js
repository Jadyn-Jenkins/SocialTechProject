
let postSection2 = document.getElementById('postSection2');
console.log(postSection2);

export function showOnlinePerson() {
    let allOnlineUsers = [];
    const endpoint = "https://microbloglite.herokuapp.com/api/";
    const loginData = JSON.parse(window.localStorage.getItem("login-data"));
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${loginData.token}` },
    };
    fetch(endpoint + `posts?limit=1000`, options)
      .then((results) => results.json())
      .then((data) => {
        data.forEach((arrItem) => {
          let hourToShowOnline = 4;
          let actualPostTime = arrItem.createdAt;
          let postTimeMilSec = new Date(actualPostTime).getTime();
          let increasePostTime = postTimeMilSec + hourToShowOnline * 60 * 60 * 1000;
          let currentTime = new Date();
          let currentTimeMiliSec = currentTime.getTime();
        //   postSection2.style.display = "none";
          if (increasePostTime > currentTimeMiliSec) {
            if (!allOnlineUsers.includes(arrItem.username)) {
              allOnlineUsers.push(arrItem.username);
              const childElement = document.createElement("div");
              childElement.classList.add("child");
              const imgElement = document.createElement("img");
              imgElement.id = "onlineProfile";
              imgElement.src = "../img/User-user.svg";
              imgElement.alt = "profile picture";
              childElement.appendChild(imgElement);
              const pElement = document.createElement("p");
              pElement.innerText = `${arrItem.username}`;
              childElement.appendChild(pElement);
              const imgTagOnline = document.createElement("img");
              imgTagOnline.id = "onlineIcon";
              imgTagOnline.src = "../img/online-green.jpeg";
              imgTagOnline.alt = "green-online-picture";
  
              childElement.appendChild(imgTagOnline);
              postSection2.appendChild(childElement);
              postSection2.style.display = "flex";
            //   window.location.reload(true);
            }
          }
        });
      });
  }
// let onlineUsesr = document.getElementById('onlineUsesr');
// console.log(onlineUsesr);
// // export function showOnlinePerson() {
// //     console.log('function displayOnlineUsers is working ................');
// // }





// export function showOnlinePerson() {
//     const endpoint = "https://microbloglite.herokuapp.com/api/";
//     const loginData = JSON.parse(window.localStorage.getItem("login-data"));
//     const options = {
//       method: "GET",
//       headers: { Authorization: `Bearer ${loginData.token}` },
//     };
//     fetch(endpoint +`posts?limit=1000`, options)
//       .then((results) => results.json())
//       .then((data) => {
//         data.forEach(arrItem => {
//              //for calculating date
             
//             let miliSecToSee  = 18000000;
//             let  actualPostTime = arrItem.createdAt;
//             let postTimeMilSec = new Date(actualPostTime).getTime();
//             let currentTime = new Date();
//             let miliSecCurrentTime = currentTime.getTime();
//             if ( postTimeMilSec > miliSecCurrentTime - miliSecToSee) {
//                 //creating html element with javascript
//                 const childElement = document.createElement("div");
//                 childElement.classList.add("child");
//                 const imgElement = document.createElement("img");
//                 imgElement.id = "onlineProfile";
               
//                 //     <img src="../img/online-green.jpeg" alt="">
//                 // <img src="../img/online-green.jpeg" alt="">
//                  // <img src="../img/user-286.png" alt=""></img>
               
//                 imgElement.src = "../img/user-286.png";
//                 imgElement.alt = "user picture";
//                 childElement.appendChild(imgElement);
//                 const pElement = document.createElement("p");
//                 pElement.innerText = `${arrItem.username}`;
//                 childElement.appendChild(pElement);
//                 const imgTagOnline = document.createElement("img");
//                 imgTagOnline.id = "onlineIcon";
               
               
//                    // imgTagOnline.src = "../images/offline-red.png";
//                     // imgTagOnline.alt = "red offline picture";
               
//                     imgTagOnline.src = "../img/online-green.jpeg";
//                      imgTagOnline.alt = "green-online-picture";
               
//                     childElement.appendChild(imgTagOnline);
//                     onlineUsesr.appendChild(childElement);
//             }
//             else {
//                 // onlineUsesr.style.display = "none";
//             }
            
//         });
//     });
// }


