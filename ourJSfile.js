// über alle Reiseziele drüberiteriern => close Button hinzufügen
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
    addCloseButtonToElement(myNodelist[i]);
}

function addCloseButtonToElement(element) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7"); // × Malzeichen => \u00D7
    span.className = "close";
    span.appendChild(txt);
    element.appendChild(span);

    // löschen/verstecken des Elements bei Klicken auf ×
    span.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        //div.remove();
    }
}

var destinationList = document.querySelector('ul');
destinationList.addEventListener('click', function(destinationElement) {
    if (destinationElement.target.tagName === 'LI') {
        destinationElement.target.classList.toggle('checked');
    }
}, false);

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
