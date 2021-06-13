// Functions to switch Add or Update Modal
const signUp = () => {
    alert("Sign Up Successful");
    //direct to signup route

}

const login = () => {
    alert("Login Successful");
    //direct to login route

}



// Modal Switching feature
const homepageModalToSign = () => {
    $("#emailInput").val("");
    $("#passwordInput").val("");
    // Change Modal attributes
    $("#homeModal").find("form").attr("id", "form-signUp");
    $("#homeModal").find("h5").text("Sign Up");
    // element.on() method should be after the creation of that element
    $("#form-signUp").on("submit", signUp);
};
const homepageModalToLogin = () => {
    $("#emailInput").val("");
    $("#passwordInput").val("");
    // Change Modal attributes
    $("#homeModal").find("form").attr("id", "form-login");
    $("#homeModal").find("h5").text("Login");
    // element.on() method should be after the creation of that element
    $("#form-login").on("submit", login);
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