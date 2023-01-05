/* Posts Page JavaScript */

"use strict";

/* Imported Global */
import { loadProfile } from "/scripts/loadProfile.js";
import { popPosts } from "/scripts/populatePosts.js";

/* Event Handlers */
document.querySelector('#goToProfile').addEventListener('click', () =>  window.location.assign("/profile"));
window.onload = () => {
    loadProfile();
    popPosts();
};
