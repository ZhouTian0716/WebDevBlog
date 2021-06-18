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
      console.log("test");
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in!");
    }
  }
};

const signUpFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#emailInput").value.trim();
  const password = document.querySelector("#passwordInput").value.trim();
  // We do a get to validate new sign up email.
  try {
    var registedEmails = [];
    const responseGet = await fetch('/api/account');
    const dataGet = await responseGet.json();
    registedEmails = dataGet.map(({ email }) => email);
    if( registedEmails.includes(email) ){
      alert("This email has already been taken!" );
      return;
    }
    else{
      const response = await fetch('/api/account', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }

    }
  } catch (err) {
    console.error(err);
  }



}


  




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