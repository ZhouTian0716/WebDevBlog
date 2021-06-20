// &&&&&&&&&&&&&&&&&&&&  Comment CRUD  &&&&&&&&&&&&&&&&&&&&
// Put Edit & Delete Buttons on logged in user's comments
const addEditButton = () => {
    const sessionID = $("header").attr("data-session");
    const numComments = $("#commentSection").children(".card").length;
    var commentID;
    for(var i=0; i < numComments; i++){
        commentID = $("#commentSection").children().eq(i).attr("data-id");
        if( sessionID === commentID) {
            var newDiv = $('<div>').addClass('btnDiv');
            var editBtnEl = $('<i>').addClass('fas fa-edit editCommentBtn');
            var deleteBtnEl = $('<i>').addClass('fas fa-trash-alt deleteCommentBtn');
            var rowDivEl = $("#commentSection").children().eq(i).find(".row");
            newDiv.append(editBtnEl, deleteBtnEl);
            rowDivEl.append(newDiv);
        }
    }
}
addEditButton();

// &&&&&&&&&&&&&&&&&&&&  Comment Create  &&&&&&&&&&&&&&&&&&&&
// Feature: newComment section toggle btn
const hideCreateCommentSec = () => {
    $("#newCommentSec").css("display", "none");
};
$("#newCommentHide").on("click", hideCreateCommentSec);

const showCreateCommentSec = () => {
    $("#newCommentSec").css("display", "block");
};
$("#newCommentBtn").on("click", showCreateCommentSec);

// Create Comment in DB
const createComment = async (event) => {
    event.preventDefault();
    let content = $("#contentInput").val();
    let blog_id = $("header").attr("data-blogID");
    try {
        const response = await fetch('/api/Comment', {
            method: 'POST',
            body: JSON.stringify({ content, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            alert(response.statusText);
        }
        $("#newCommentSec").css("display", "none");
        alert("New Comment added!");
        location.reload();
    } catch (err) {
        console.error(err);
    }
}
$("#newCommentForm").on("submit", createComment);




// &&&&&&&&&&&&&&&&&&&&  Delete Comment  &&&&&&&&&&&&&&&&&&&&
const deleteComment = async (event) => {
    if(confirm("Are you sure to delete this Comment?")){
        event.stopPropagation();
        let targetBtn = $(event.target);
        let commentId = targetBtn.parent().parent().attr("data-commentID");
        // Call this Backend Route with this method
        const response = await fetch(`/api/comment/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        });
        if (response.ok) {
        // Front end element manipulating actions
        $(event.target).parent().parent().parent().remove();
        }
    }    
};
$(".deleteCommentBtn").on("click", deleteComment);