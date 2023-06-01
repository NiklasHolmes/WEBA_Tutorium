// iterate over all list elements + add delete button
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
    addCloseButtonToElement(myNodelist[i]);
}

// add close button to every list element
function addCloseButtonToElement(element) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7"); // × Malzeichen => \u00D7
    span.className = "close";
    span.tabIndex = "0.5";
    span.appendChild(txt);
    element.appendChild(span);

    // delete / hide element with ×
    span.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        //div.remove();
    }
}

// make list elements (un)checkable
var destinationList = document.querySelector('ul');
destinationList.addEventListener('click', function(destinationElement) {
    if (destinationElement.target.tagName === 'LI') {
        destinationElement.target.classList.toggle('checked');
    }
}, false);

// create new list element
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("InputDestination").value;
    var textNode = document.createTextNode(inputValue);
    li.appendChild(textNode);

    if (inputValue == "") {
        alert("Write a destination!")
        return;
    } else {
        document.getElementById("destinationList").appendChild(li);
    }

    document.getElementById("InputDestination").value = "";

    addCloseButtonToElement(li); // add close button

    var list = document.querySelector('ul');
    list.appendChild(li);
}

// make list tabulator-able (going through with tab is possible with this)
var listItems = document.querySelectorAll('#destinationList li');
listItems.forEach(function(item) {
    item.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            var currentIndex = Array.from(listItems).indexOf(item);
            var nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
            if (nextIndex < 0) {
                nextIndex = listItems.length - 1;
            } else if (nextIndex >= listItems.length) {
                nextIndex = 0;
            }
            listItems[nextIndex].focus();
        }
    });
});