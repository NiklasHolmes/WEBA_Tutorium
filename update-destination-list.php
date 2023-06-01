
<?php
    $destinationListFile = 'destination-list.json';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $requestData = file_get_contents('php://input'); // read request body

        $destinationList = json_decode($requestData, true);
        if($destinationList === null) {
            // json parse error
            http_response_code(400);
            echo 'Ungültige Daten';
            exit();
        }

        $saved = file_put_contents($destinationListFile, json_encode($destinationList));
        if($saved === false) {
            http_response_code(500);
            echo 'Fehler beim Speichern der Daten!';
            exit();
        }

        http_response_code(200);
        echo 'Destination Liste erfolgreich aktualisiert!';
    }else {
        http_response_code(405);
        echo 'Nur POST-Methode erlaubt!';
    }

?>
