/* Posts Page JavaScript */

"use strict";

import { loadProfile, loginData } from "/scripts/loadProfile.js";
import { popPosts } from "/scripts/populatePosts.js";

document.querySelector('#goToProfile').addEventListener('click', () =>  window.location.assign("/profile"));

window.onload = () => {
    loadProfile();
    popPosts();
};
