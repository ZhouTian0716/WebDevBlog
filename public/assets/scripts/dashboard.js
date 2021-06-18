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

// &&&&&&&&&&&&&&&&&&&&  Update Blog  &&&&&&&&&&&&&&&&&&&&
// Feature: Editing section toggle btn
const hideEditBlogSec = () => {
    $("#editBlogSec").css("display", "none");
};
$("#editBlogHide").on("click", hideEditBlogSec);

// Step 1: Put selected blog into edit area
var blogIdClicked;
const fillEdit = (event) => {
    $("#editBlogSec").css("display", "block");
    let targetBtn = $(event.target);
    blogIdClicked = targetBtn.attr("data-blogId");
    let blogTitle = targetBtn.attr("data-blogTitle");
    let blogBody = targetBtn.attr("data-blogBody");
    $("#titleEdit").val(blogTitle);
    $("#bodyEdit").val(blogBody);
}
$(".titleTarget").on("click", fillEdit);

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