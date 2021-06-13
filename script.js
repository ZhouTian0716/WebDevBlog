// Functions to switch Add or Update Modal
const signUp = () => {
    alert("Sign Up Successful");
    //direct to signup route
}

const login = () => {
    alert("Login Successful");
    //direct to login route
}


const homepageModalToSign = () => {
    // Change Modal attributes
    $("#homeModal").find("form").attr("id", "form-signUp");
    $("#homeModal").find("h5").text("Sign Up");
    $("#homeModal").find(".password").children(".form-control").attr("id", "passwordSignUp");
    // Any eventlisener targeting the elements inside a dynamic modal should be inside the modal updating function.
    $("#form-signUp").on("submit", signUp);
    // console.log($("#passwordSignUp").attr("type"));

    if( $("#passwordSignUp").attr("type") === "password" ) { $("#toggolePassword").on("click", passwordShow ) }
        else { $("#toggolePassword").on("click", passwordhide ) }
    
};

const homepageModalToLogin = () => {
    // Change Modal attributes
    $("#homeModal").find("form").attr("id", "form-login");
    $("#homeModal").find("h5").text("Login");
    // Any eventlisener targeting the elements inside a dynamic modal should be inside the modal updating function.
    $("#form-login").on("submit", login);
    $("#form-login").on("click", "#toggolePassword", () => {
        console.log($("#passwordInput").attr("type"));
        if( $("#passwordInput").attr("type") === "password" ) { passwordShow() }
        else { passwordhide() }
    })
};
  
$("#signUpBtn").on("click", homepageModalToSign);
$("#loginBtn").on("click", homepageModalToLogin);

// Toggle Password feature
const passwordShow = () => {
    $("#homeModal").find(".password").children(".form-control").attr("type", "text");
    // $("#passwordInput").attr("type", "text");
    $("#toggolePassword").attr("class", "fas fa-eye-slash");
}
const passwordhide = () => {
    $("#homeModal").find(".password").children(".form-control").attr("type", "password");
    // $("#passwordInput").attr("type", "password");
    $("#toggolePassword").attr("class", "fas fa-eye");
}

// const toggoleLisener = () => {
//     $("#toggolePassword").on("click", () => {
//         if( $("#passwordInput").attr("type") === "password" ) { passwordShow() }
//         else { passwordhide() }
//     })
// }
