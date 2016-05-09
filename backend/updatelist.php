<?php
	include 'connection.php';

	$t = $_GET['type'];

	switch ($t) {
	    case "col":
	        $query = mysqli_query($conn, 'SELECT * FROM collection');

			$rows = array();
			while($r = mysqli_fetch_assoc($query)) {
			    $rows[] = $r;
			}
			print json_encode($rows);
			

	    	break;

	    case "cat":
	        $query = mysqli_query($conn, 'SELECT * FROM category');

			$rows = array();
			while($r = mysqli_fetch_assoc($query)) {
			    $rows[] = $r;
			}
			print json_encode($rows);
			

	    	break;

	     case "item":
	        $query = mysqli_query($conn, 'SELECT * FROM item');

			$rows = array();
			while($r = mysqli_fetch_assoc($query)) {
			    $rows[] = $r;
			}
			print json_encode($rows);
			

	    	break;
	   
	}

	$conn->close();

	


?>