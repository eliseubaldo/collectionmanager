<?php
	include 'connection.php';

	$t = $_GET['type'];

	$data = file_get_contents('php://input');
	$obj = json_decode($data,true);

	$col_name = $obj['name'];


	switch ($t) {
	    case "col":
	        $sql = "INSERT INTO collection (collection_id, collection_name) VALUES (NULL, '" .  $obj['name'] ."')";

	        if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
			} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}$conn->close();

	    	break;

	     case "cat":
	        $sql = "INSERT INTO category (category_id, category_name, category_year, collection_id) VALUES (NULL, '" . $obj['name'] ."', '" . $obj['year'] ."', '" . $obj['collection'] ."')";

	        if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
			} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}$conn->close();

	    	break;

	    case "item":
	       	$filename = $_FILES['file']['name'];
	    	$item = $_POST['otherinfo'];
			$npath = '../uploads/'. $item['collection']['collection_name'];
			if(!is_dir($npath)){
			    //Directory does not exist, so lets create it.
			    mkdir($npath, 0777);
			} 

			// Generate a unique file name
			$new_image_name = date('Y-m-d-s') . uniqid() . '-' . $filename;

			$destination = $npath .'/' . $new_image_name;
			move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );

			$sql = "INSERT INTO item (item_id, category_id, item_description, item_name, item_picture) VALUES (NULL, '" . $item['category']['category_id'] ."', '" . $item['desc'] ."', '" . $item['name'] ."', '" . $new_image_name ."' )";

	        if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
			} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}$conn->close();

	    	break;

	    
	}


?>