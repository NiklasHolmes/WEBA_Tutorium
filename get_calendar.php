<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $month = $_POST["month"] + 1; //TODO month correct?
    $year = $_POST["year"];

    $firstDayofMonth = date("N", strtotime("$year-$month-01"));
    $totalDays = (new DateTime("$year-$month"))->format("t");

    $calendar = "<table>";
    $calendar .= "<tr><th colspan='7'>" . strftime("%B %Y", strtotime("$year-$month-01")) . "</th></tr>";
    $calendar .= "<tr>
                    <th>Mo</th>
                    <th>Di</th>
                    <th>Mi</th>
                    <th>Do</th>
                    <th>Fr</th>
                    <th>Sa</th>
                    <th>So</th>             
                  </tr>";

    $calendar .= "<tr>";

    for($i = 1; $i < $firstDayofMonth; $i++) {
        $calendar .= "<td></td>";
    }
    for($day = 1; $day <= $totalDays; $day++) {
        $calendar .= "<td class='noEvent' id='$year-"
            . sprintf("%02d", $month) . "-"
            . sprintf("%02d", $day) . "'>$day</td>";
        // => <td class='noEvent' id='2023-06-01'>1</td>

        if (($day + $firstDayofMonth - 1) % 7 == 0) {
            $calendar .= "</tr><tr>";
        }
    }

    $calendar .= "</tr>";
    $calendar .= "</table>";

    echo $calendar;

}


?>