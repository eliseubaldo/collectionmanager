<?php
	include 'connection.php';

	$query = 'SELECT * FROM item';

	$result = $conn->query($query);

	if ($result->num_rows > 0) {
    
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["item_id"]. " - Name: " . $row["item_name"]. " " . $row["item_description"]. "<br>";
    }
	} else {
	    echo "0 results";
	}
	$conn->close();


?>