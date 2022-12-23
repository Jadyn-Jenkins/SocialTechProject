const api = "https://microbloglite.herokuapp.com";
const signUpForm = document.querySelector("#register");

function registerUser(registerData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: registerData.username,
      fullName: registerData.fullName,
      password: registerData.password,
    }),
  };

  fetch(api + "/api/users", options)
    .then((response) => response.json())
    .then((registerData) => {
      window.localStorage.setItem(
        "register-data",
        JSON.stringify(registerData)
      );
      window.location.assign("/index.html"); // redirect
    });
}
signUpForm.onsubmit = function (event) {
  event.preventDefault();

  const registerData = {
    fullName: signUpForm.fname.value,
    username: signUpForm.uname.value,
    password: signUpForm.password.value,
  };

  signUpForm.registerBtn.disabled = true;

  registerUser(registerData);
  window.alert("Your account has been created")

};