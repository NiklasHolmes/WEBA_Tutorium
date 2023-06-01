
// ajax function => get destination list
function getDestinationList() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var destinationList = JSON.parse(xhr.responseText);
            renderDestinationList(destinationList);
        }
    }
    xhr.open('GET', 'destination-list.json', true);
    xhr.send();
    console.log("get destination list");
}

function renderDestinationList(destinationList) {
    var ul = document.getElementById('destinationList');
    ul.innerHTML = '';

    destinationList.forEach(function(destination) {
        var li = document.createElement('li');
        li.textContent = destination.name;
        if (destination.completed) {
            li.classList.add('checked');
        }

        addCloseButtonToElement(li);
        ul.appendChild(li);
    });
    attachEventListeners();
    console.log("render destination list");
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
        //div.style.display = "none";
        div.remove();
        // AJAX: update destination list:
        var destinationList = getDestinationListfromDOM();
        updateDestinationList(destinationList);

        attachEventListeners();
    }
}

function attachEventListeners() {
    var closeButtons = document.getElementsByClassName('close');
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            var div = this.parentElement;
            //div.style.display = "none";
            div.remove();
            // AJAX: update destination list:
            var destinationList = getDestinationListfromDOM();
            updateDestinationList(destinationList);
        };
    }
    var listItems = document.getElementsByTagName('li');
    for (var i = 0; i < listItems.length; i++) {
        listItems[i].onclick = function() {
            this.classList.toggle('checked');
        };
    }
}

function updateDestinationList(destinationList) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'update-destination-list.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log('Destination lost successfully updated!');
        }
    };
    xhr.send(JSON.stringify(destinationList));
}

// create new list element
function newElement() {
    var inputValue = document.getElementById('InputDestination').value.trim();
    if (inputValue === '') {
        return;
    }

    var li = document.createElement('li');
    li.textContent = inputValue;

    var span = document.createElement('span');
    span.className = 'close';
    span.appendChild(document.createTextNode('\u00D7'));
    li.appendChild(span);

    var ul = document.getElementById('destinationList');
    ul.appendChild(li);

    attachEventListeners();

    // empty input field
    document.getElementById('InputDestination').value = '';

    // AJAX: update destination list:
    var destinationList = getDestinationListfromDOM();
    updateDestinationList(destinationList);
}

function getDestinationListfromDOM() {
    var listItems = document.getElementsByTagName('li');
    var destinationList = [];

    for (var i = 0; i<listItems.length; i++) {
        var destination = {
            name: listItems[i].textContent.trim().replace(/\u00D7/g, ''),
            completed: listItems[i].classList.contains('checked')
        };
        destinationList.push(destination);
    }
    return destinationList;
}




getDestinationList();



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
