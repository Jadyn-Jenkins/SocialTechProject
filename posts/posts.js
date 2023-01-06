/* Posts Page JavaScript */

"use strict";
let postSection2 = document.getElementById("postSection2");
console.log(postSection2);
let profileDiv = document.getElementById("profileDiv");
console.log(profileDiv);

/* Imported Global */
import { loadProfile } from "/scripts/loadProfile.js";
import { popPosts } from "/scripts/populatePosts.js";
import { showOnlinePerson } from "/scripts/displayOnlineUsers.js";


/* Event Handlers */
document.querySelector('#goToProfile').addEventListener('click', () =>  window.location.assign("/profile"));
window.onload = () => {
    loadProfile();
    popPosts();
    showOnlinePerson();
};
