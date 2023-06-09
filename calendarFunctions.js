$(document).ready(function () {

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var events = []

    loadCalendar(currentMonth, currentYear);

    $("#nextMonth").on("click", function() {
        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }
        loadCalendar(currentMonth, currentYear);
    });

    $("#prevMonth").on("click", function() {
        currentMonth--;
        if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
        }
        loadCalendar(currentMonth, currentYear);
    });

    function loadCalendar(month, year) {
        $.ajax({
            url: "get_calendar.php",
            type: "POST",
            data: { month: month, year: year },
            success: function(response) {
                $("#calendar").html(response);
                bindEventClick();
                highlightEvents();
            }
        });
    }

    function bindEventClick() {
        $("td").on("click", function() {
            var day = $(this).text();
            var selectedDate = new Date(currentYear, currentMonth, day);
            var formattedDate = formatDate(selectedDate);
            var eventTitle = prompt("Event-Titel: ");
            if (eventTitle != null && eventTitle != "") {
                events.push({date: formattedDate, title: eventTitle});
                console.log(events);
                loadCalendar(currentMonth, currentYear);
                highlightEvents();
            }
            else {
                console.log("Show events!");
                showEventsForSelectedDate(formattedDate);
            }
        });
    }

    function showEventsForSelectedDate(date) {
        var eventsForSelectedDate = events.filter(function(event) {
            return event.date === date;
        });

        var eventContainer = $("#eventContainer");
        eventContainer.empty();

        if (eventsForSelectedDate.length > 0) {
            var eventList = $("<ul></ul>");
            eventsForSelectedDate.forEach(function (event) {
                var listItem = $("<li></li>").text(event.title);
                eventList.append(listItem);
            });
            eventContainer.append(eventList);
        }
        else {
            eventContainer.text("Keine Events für den ausgewählten Tag vorhanden!");
        }
    }

    function highlightEvents() {
        for (var i = 0; i < events.length; i++) {
            var eventDate = new Date(events[i].date);
            var eventMonth = eventDate.getMonth();
            var eventYear = eventDate.getFullYear();

            if(eventMonth === currentMonth && eventYear == currentYear) {
                var day = eventDate.getDate();
                console.log((eventMonth+1) + "currM: " + (currentMonth+1));
                var searchID = eventYear + "-"
                + String(eventMonth+1).padStart(2,'0') + "-"
                + String(day).padStart(2,'0');
                console.log(searchID);
                var tdElement = document.getElementById(searchID);
                tdElement.classList.remove("noEvent");
                tdElement.classList.add("event");
            }
        }
    }

    $("#addEvent").on("click", function () {
        var eventDate = $("#eventDate").val();
        var eventTitle = $("#eventTitle").val();

        if (eventDate && eventTitle) {
            events.push({ date: eventDate, title: eventTitle });
            console.log(events);
            highlightEvents();
        }
    })

    $("#tableExample").html("<table><tr>" + "<th>Das kommt aus dem Javascript</th></tr>" + "</table>");

    function formatDate(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var day = date.getDate().toString().padStart(2, "0")
        return year + "-" + month + "-" + day;
    }

});