// function alert(text) {
//   $("#alertMessage").text(text);
//   $("#alertButton").trigger("click");
// }

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#emailInput").value.trim();
  const password = document.querySelector("#passwordInput").value.trim();
  let response;
  if (email && password) {
    response = await fetch("/api/account/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in!");
    }
  }
};

const signUpFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const passwordRepeat = document
    .querySelector("#password-repeat")
    .value.trim();
  let response;
  if (email && password && password == passwordRepeat) {
    response = await fetch("/api/accounts/create", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      response = await fetch("/api/accounts", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/profile");
      }
    } else {
      alert("Failed to sign up!");
    }
  }
};

// document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);

// document.querySelector("#signBtn").addEventListener("click", signUpFormHandler);


// Modal Switching feature
const homepageModalToSign = () => {
  $("#emailInput").val("");
  $("#passwordInput").val("");
  // Change Modal attributes
  $("#homeModal").find("form").attr("id", "form-signUp");
  $("#homeModal").find("h5").text("Sign Up");
  // element.on() method should be after the creation of that element
  $("#form-signUp").on("submit", signUpFormHandler);
};
const homepageModalToLogin = () => {
  $("#emailInput").val("");
  $("#passwordInput").val("");
  // Change Modal attributes
  $("#homeModal").find("form").attr("id", "form-login");
  $("#homeModal").find("h5").text("Login");
  // element.on() method should be after the creation of that element
  $("#form-login").on("submit", loginFormHandler);
};

$("#signUpBtn").on("click", homepageModalToSign);
$("#loginBtn").on("click", homepageModalToLogin);

// Toggle Password feature
const passwordShow = () => {
  $("#homeModal").find(".password").children(".form-control").attr("type", "text");
  // $("#passwordInput").attr("type", "text");
  $("#toggolePw").attr("class", "fas fa-eye-slash");
}
const passwordhide = () => {
  $("#homeModal").find(".password").children(".form-control").attr("type", "password");
  // $("#passwordInput").attr("type", "password");
  $("#toggolePw").attr("class", "fas fa-eye");
}

$(document).on("click", "#toggolePw", () => {
  if ( $("#passwordInput").attr("type")==="password" ){ passwordShow() }
  else { passwordhide() }
});