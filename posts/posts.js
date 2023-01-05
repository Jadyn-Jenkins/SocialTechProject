/* Posts Page JavaScript */

"use strict";
let postSection2 = document.getElementById("postSection2");
console.log(postSection2);
let profileDiv = document.getElementById("profileDiv");
console.log(profileDiv);

import { loadProfile, loginData } from "/scripts/loadProfile.js";
import { popPosts } from "/scripts/populatePosts.js";
import { showOnlinePerson } from "/scripts/displayOnlineUsers.js";


document.querySelector('#goToProfile').addEventListener('click', () =>  window.location.assign("/profile"));

window.onload = () => {
    loadProfile();
    popPosts();
    showOnlinePerson();
};
