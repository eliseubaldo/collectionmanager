<?php
	include 'connection.php';

	$t = $_GET['type'];

	$data = file_get_contents('php://input');
	$obj = json_decode($data,true);

	$col_name = $obj['name'];
	

	switch ($t) {
	    case "col":
	        /* insert data into DB */
			$sql = "INSERT INTO collection (collection_id, collection_name) VALUES (NULL, '" .  $obj['name'] ."')";

	        if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
			} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}$conn->close();

	    	break;
	     case "cat":
	        /* insert data into DB */
			$sql = "INSERT INTO category (category_id, category_name, category_year, collection_id) VALUES (NULL, '" . $obj['name'] ."', '" . $obj['year'] ."', '" . $obj['collection'] ."')";

	        if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
			} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}$conn->close();

	    	break;
	    case "green":
	        echo "Your favorite color is green!";
	        break;	    
	}


?>