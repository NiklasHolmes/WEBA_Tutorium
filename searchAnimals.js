function searchForAnimal() {
    var inputName = document.getElementById('inputName');
    var searchQuery = inputName.value.trim().toLowerCase(); // Remove leading/trailing whitespace and convert to lowercase

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var animalList = JSON.parse(xhr.responseText);
            var searchResult = document.getElementById('searchResult');
            searchResult.innerHTML = ''; // Clear previous search results

            // Search for matching animals
            var matchingAnimals = animalList.filter(function(animal) {
                var animalName = animal.name.toLowerCase();
                return animalName.includes(searchQuery);     // INCLUDES
            });
            // var matchingAnimals = animalList.filter(function(animal) {
            //     var animalName = animal.name.toLowerCase();
            //     var animalLastName = animal.lastName.toLowerCase();
            //     return (
            //         animalName.startsWith(searchQuery) ||
            //         animalLastName.startsWith(searchQuery)
            //     );
            // });

            // Display search results
            if (searchQuery === '' || matchingAnimals.length === 0) {
                var table = document.createElement('table');
                table.classList.add('animal-table');

                var noResultRow = document.createElement('tr');
                var noResultCell = document.createElement('td');
                noResultCell.setAttribute('colspan', '5');
                noResultCell.textContent = 'No matching animals found.';
                noResultRow.appendChild(noResultCell);
                table.appendChild(noResultRow);

                searchResult.appendChild(table);
            } else if (matchingAnimals.length > 0) {
                var table = document.createElement('table');
                table.classList.add('animal-table');

                // Create table header
                var tableHeader = document.createElement('tr');
                var idHeader = document.createElement('th');
                idHeader.textContent = 'ID';
                var nameHeader = document.createElement('th');
                nameHeader.textContent = 'Name';
                var animalHeader = document.createElement('th');
                animalHeader.textContent = 'Animal';
                var ageHeader = document.createElement('th');
                ageHeader.textContent = 'Age';
                var imageHeader = document.createElement('th');
                imageHeader.textContent = 'Image';
                tableHeader.appendChild(idHeader);
                tableHeader.appendChild(nameHeader);
                tableHeader.appendChild(animalHeader);
                tableHeader.appendChild(ageHeader);
                tableHeader.appendChild(imageHeader);
                table.appendChild(tableHeader);

                // Create table rows for each matching animal
                for (var i = 0; i < matchingAnimals.length; i++) {
                    var animal = matchingAnimals[i];

                    var tableRow = document.createElement('tr');
                    var idCell = document.createElement('td');
                    idCell.textContent = animal.id;
                    var nameCell = document.createElement('td');
                    nameCell.textContent = animal.name;
                    var animalCell = document.createElement('td');
                    animalCell.textContent = animal.animal;
                    var ageCell = document.createElement('td');
                    ageCell.textContent = animal.age;
                    var imageCell = document.createElement('td');
                    var image = document.createElement('img');
                    image.src = 'images/' + animal.id + '.jpg';
                    image.style.width = '50px'; // Set the width of the image
                    image.style.height = '50px'; // Set the height of the image
                    imageCell.appendChild(image);

                    tableRow.appendChild(idCell);
                    tableRow.appendChild(nameCell);
                    tableRow.appendChild(animalCell);
                    tableRow.appendChild(ageCell);
                    tableRow.appendChild(imageCell);
                    table.appendChild(tableRow);
                }
                searchResult.appendChild(table);
            }
        }
    };
    xhr.open('GET', 'animalList.json', true);
    xhr.send();
}