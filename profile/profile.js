/* Profile Page JavaScript */
"use strict";

/* Imported Global */
import { loadProfile, loginData } from "/scripts/loadProfile.js";
import { popPosts } from "/scripts/populatePosts.js";

/* Global Variables */
let formJSON;
const endpoint = "https://microbloglite.herokuapp.com";
const postsLocation = "/api/posts";
const updateUserLocation = "/api/users/";
const updateForm = document.querySelector("#updateAccountForm");

/* Event Handlers */
document.querySelector("#profileForm").addEventListener("submit", collectAndSendData);
document.querySelector("#goToFeed").addEventListener("click", () => window.location.assign("/posts"));
document.querySelector("#updateLink").addEventListener("click", showUpdateFields);
updateForm.addEventListener("submit", updateAccount);
window.onload = () => {
  loadProfile();
  popPosts(loginData.username);
};

/* Functions */
function collectAndSendData(evt) {
  evt.preventDefault();

  /* Scoped Variables */
  const data = new FormData(evt.target);
  formJSON = Object.fromEntries(data.entries());

  setTimeout(postFormData, 300);
  setTimeout(() => popPosts(loginData.username), 500);
}

function postFormData() {
  /* Scoped Variables */
  const POSToptions = {
    method: "POST",
    body: JSON.stringify(formJSON),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    }
  };

  fetch(`${endpoint}${postsLocation}`, POSToptions)
  .catch((error) => {
    console.log(error);
    ("Unexpected Error");
  });
}

function showUpdateFields() {
  /* Scoped Variables */
  const GEToptions = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(`${endpoint}${updateUserLocation}${loginData.username}`, GEToptions)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#fullNameUpdateField").value = data.fullName;
      document.querySelector("#bioUpdateField").value = data.bio;
      updateForm.hidden = false;
    })
    .catch((error) => {
      console.log(error);
      ("Unexpected Error");
    });
}

function updateAccount(evt) {
  evt.preventDefault();

  /* Scoped Variables */
  const data = {
    bio: evt.target.bio.value,
    fullName: evt.target.fullName.value,
    password: evt.target.password.value,
  };

  evt.target.updateBtn.disabled = true;
  postAccountUpdateToServer(data);
}

function postAccountUpdateToServer(updateAccountData) {
  /* Scoped Variables */
  const PUToptions = {
    method: "PUT",
    body: JSON.stringify({
      bio: updateAccountData.bio,
      fullName: updateAccountData.fullName,
      password: updateAccountData.password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(
    `${endpoint}${updateUserLocation}${loginData.username}`,
    PUToptions
  ).catch((error) => {
    console.log(error);
    ("Unexpected Error");
  });

  updateForm.hidden = true;
  setTimeout(() => location.reload(), 500);
}
