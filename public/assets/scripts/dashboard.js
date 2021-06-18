// userModal Relevant
const fillCurrent = () => {
    $("#userName").val($("#nameDisplay").text());
    $("#iconID").val($("#iconDisplay").attr("data-imgID"));
};
$("#userEditBtn").on("click", fillCurrent);

const fillIcon = (event) => {
    let targetIcon = $(event.target);
    let imgID = targetIcon.attr("data-imgID");
    $("#iconID").val(imgID);
};
$(".previewIcon").on("click", fillIcon);

const updateUserDetail = async() => {
    let userID = $("#nameDisplay").attr("data");
    let name = $("#userName").val();
    let icon = $("#iconID").val();
    const response = await fetch(`/api/user/${userID}`, {
        method: "PUT",
        body: JSON.stringify({ name, icon }),
        headers: {
          "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        alert("Failed to update");
    }
    location.reload();
};
$("#user-form").on("submit", updateUserDetail);