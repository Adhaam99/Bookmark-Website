var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");
var submitBtn = document.querySelector(".input-btn");
var deleteBtn = document.querySelectorAll("#delete");
var tableBody = document.querySelector("tbody")
var x = document.querySelector(".fa-x")
var lightBoxContainer = document.querySelector(".lightBoxContainer")
var bookmarkList;


if (localStorage.getItem("bookmarks") == null) {

    bookmarkList = [];

}
else {

    bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));

    display(bookmarkList)
}

//Add Bookmark

submitBtn.addEventListener("click", function (e) {

    if (siteName.classList.contains("is-valid") && siteUrl.classList.contains("is-valid")) {
        var bookmark = {

            bookmarkName: siteName.value,
            bookmarkUrl: siteUrl.value
        }

        bookmarkList.push(bookmark)

        localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))

        display(bookmarkList)

        clearValues()
    }
    else{
        lightBoxContainer.classList.replace("d-none","d-flex")
    }



})

function display(arr) {
    var cartona = "";
    for (var i = 0; i < arr.length; i++) {
        var index = i + 1
        cartona += `
        <tr>
        <td>${index}</td>
        <td>${arr[i].bookmarkName}</td>
        <td> <a href="${arr[i].bookmarkUrl}" target="_blank" class="btn btn-visit">Visit <i class="fa-solid fa-eye"></i></a></td>
        <td><button onclick="deleteItem(${i})" class="delete-btn btn btn-danger">Delete <i class="fa-solid fa-trash-can"></i></button> </td>
    </tr>

        `
    }

    tableBody.innerHTML = cartona;

}

//delete

function deleteItem(deletedIndex) {

    bookmarkList.splice(deletedIndex, 1)

    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))

    display(bookmarkList)
}

//validation

siteName.addEventListener("input", function () {

    var regex = /^(\d|\w|\s){3,}$/gm;

    validation(siteName, regex, siteName.value)
})

siteUrl.addEventListener("input", function () {

    var regex = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/
    validation(siteUrl, regex, siteUrl.value)


})

//validation function

function validation(name, reg, val) {

    if (reg.test(val)) {
        name.classList.add("is-valid");
        name.classList.remove("is-invalid");

    }
    else {
        name.classList.add("is-invalid");
        name.classList.remove("is-valid");


    }
}

//light box cancel

(x, lightBoxContainer).addEventListener("click", function () {

    lightBoxContainer.classList.replace("d-flex", "d-none")

})

//Clear

function clearValues(){

    siteName.value=null;
    siteUrl.value=null;
    siteName.classList.remove("is-valid")
    siteUrl.classList.remove("is-valid")

}

// الايفنت ليسنر مش شغال ياريت لو تقولي اي المشكلة ف الفيدباك

/*
for (var i = 0; i < deleteBtn.length; i++) {
    deletedIndex = i;
    deleteBtn[i].addEventListener("click", function (e) {
        console.log("hello");
        bookmarkList.splice(deletedIndex, 1)

        localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))

        display(bookmarkList)


    })
}
*/