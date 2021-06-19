// &&&&&&&&&&&&&&&&&&&&  Delete Account  &&&&&&&&&&&&&&&&&&&&
const deleteAccount = async () => {
    if(confirm("Are you sure to delete this Account?")){
        // Call this Backend Route with this method
        let userID = $("#nameDisplay").attr("data");
        const response = await fetch(`/api/account/${userID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        });
        if (response.ok) {
        // Back to Home Page
        document.location.replace("/");
        }
    }    
};
$("#deleteAccount").on("click", deleteAccount);

// &&&&&&&&&&&&&&&&&&&&  Update User  &&&&&&&&&&&&&&&&&&&&
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

const updateUserDetail = async(event) => {
    event.preventDefault();
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

// &&&&&&&&&&&&&&&&&&&&  Create Blog  &&&&&&&&&&&&&&&&&&&&
// Feature: newBlog section toggle btn
const hideCreateBlogSec = () => {
    $("#newBlogSec").css("display", "none");
};
$("#newBlogHide").on("click", hideCreateBlogSec);

const showCreateBlogSec = () => {
    $("#newBlogSec").css("display", "block");
};
$("#newBlogBtn").on("click", showCreateBlogSec);

// Create Blog in DB
const createBlog = async (event) => {
    event.preventDefault();
    const title = $("#titleInput").val();
    const body = $("#bodyInput").val();
    try {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            alert(response.statusText);
        }
        $("#newBlogSec").css("display", "none");
        alert("New blog added to My blogs list!");
        location.reload();
    } catch (err) {
        console.error(err);
    }
}
$("#newBlogForm").on("submit", createBlog);

// &&&&&&&&&&&&&&&&&&&&  Update & View Blog  &&&&&&&&&&&&&&&&&&&&
// Feature: Editing section toggle btn
const hideEditBlogSec = () => {
    $("#editBlogSec").css("display", "none");
};
$("#editBlogHide").on("click", hideEditBlogSec);

// Step 1: 
var blogIdClicked;
const fillAndGet =  async (event) => {
//Part One, Put selected blog into edit area.    
    $("#editBlogSec").css("display", "flex");
    let targetBtn = $(event.target);
    blogIdClicked = targetBtn.attr("data-blogId");
    let blogTitle = targetBtn.attr("data-blogTitle");
    let blogBody = targetBtn.attr("data-blogBody");
    $("#titleEdit").val(blogTitle);
    $("#bodyEdit").val(blogBody);
//Part Two, Do a get method, to collect all comments for selected blog  
    try{
        var commentData = await fetch(`/api/comment/blog/${blogIdClicked}`);
        var commentObjArray = await commentData.json();
    }catch (err) {
        console.error(err);
    } 
//Part Three, to construct the comment cards
    $('#editBlogSec').children('.card').remove();
    for (let i=0; i < commentObjArray.length; i++){
        let contentData = commentObjArray[i].content;
        let dateData = commentObjArray[i].com_date;
        let dateFormated = moment(dateData).format("DD/MM/YYYY");
        let iconData = commentObjArray[i].user.icon;
        let nameData = commentObjArray[i].user.name;
        let contentEl = $('<h5>').text(contentData);
        let dateEl = $('<h5>').text(dateFormated);
        let iconEl = $('<img>').addClass('commentIcon').attr("src",`/assets/img/${iconData}.JPG`);
        let nameEl = $('<h3>').text(nameData);
        const innerDivEl = $('<div>');
        const rowDivEl = $('<div>').addClass('row');
        const cardDivEl = $('<div>').addClass('card');
        innerDivEl.append(nameEl, dateEl);
        rowDivEl.append(iconEl, innerDivEl);
        cardDivEl.append(rowDivEl, contentEl)
        $("#editBlogSec").append(cardDivEl); 
    }
}

$(".titleTarget").on("click", fillAndGet);

// Step 2: Update selected blog in database
const updateBlog = async (event) => {
    event.preventDefault();
    const title = $("#titleEdit").val().trim();
    const body = $("#bodyEdit").val().trim();
    // Call this Backend Route with this method
    const response = await fetch(`/api/blog/${blogIdClicked}`, {
      method: "PUT",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to update");
    }
    location.reload();
};
$("#editBlogForm").on("submit", updateBlog);

// &&&&&&&&&&&&&&&&&&&&  Delete Blog  &&&&&&&&&&&&&&&&&&&&
const deleteBlog = async (event) => {
    if(confirm("Are you sure to delete this blog?")){
        event.stopPropagation();
        let targetBtn = $(event.target);
        let blogId = targetBtn.attr("data-blogId");
        // Call this Backend Route with this method
        const response = await fetch(`/api/blog/${blogId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        });
        if (response.ok) {
        // Front end element manipulating actions
        $(event.target).parent().parent().remove();
        }
    }    
};
$(".deleteBlogBtn").on("click", deleteBlog);