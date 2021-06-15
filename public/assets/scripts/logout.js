// function alert(text) {
//   $("#alertMessage").text(text);
//   $("#alertButton").trigger("click");
// }

const logout = async () => {
  const response = await fetch("/api/account/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
    alert("Log out Successfully");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logOutBtn").addEventListener("click", logout);
