// Get the create modal
var createModal = document.getElementById("createPostModal");

// Get the button that opens the create modal
var newButton = document.getElementById("new-button");

// Get the <span> elements that close the modals
var createModalClose = createModal.getElementsByClassName("close")[0];

// When the user clicks on the button to create a new post, open the create modal
newButton.onclick = function () {
    createModal.style.display = "block";
}

// When the user clicks on <span> (x) in the create modal, close the create modal
createModalClose.onclick = function () {
    createModal.style.display = "none";
}

// When the user clicks anywhere outside of the modals, close them
window.onclick = function (event) {
    if (event.target == createModal) {
        createModal.style.display = "none";
    }
}

const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-post').value.trim();
    const content = document.querySelector('#content-post').value.trim();

    if (title && content) {
        const response = await fetch('./api/posts', {
            // Create new post using the posts route
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert('Failed to create post')
        }
    }
};

document
    .querySelector('#newPostButton')
    .addEventListener('click', newPostHandler);
