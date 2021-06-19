// &&&&&&&&&&&&&&&&&&&&  Comment CRUD  &&&&&&&&&&&&&&&&&&&&
// Put Edit Buttons on logged in user's comments
const addEditButton = () => {
    const sessionID = $("header").attr("data-session");
    const numComments = $("#commentSection").children(".card").length;
    var commentID;
    for(var i=0; i < numComments; i++){
        commentID = $("#commentSection").children().eq(i).attr("data-id");
        console.log(commentID);
        if( sessionID === commentID) {
            var editBtnEl = $('<i>').addClass('fas fa-edit editCommentBtn');
            var deleteBtnEl = $('<i>').addClass('fas fa-trash-alt deleteCommentBtn');
            var userNameEl = $("#commentSection").children().eq(i).find("h3");
            userNameEl.append(editBtnEl, deleteBtnEl);
        }

    }
}

addEditButton();
