<?php
	include 'connection.php';

	$t = $_GET['type'];
	if(isset($_GET['id']))
	{
	    $id = $_GET['id'];
	} else {
		$id = "";
	}
		

	switch ($t) {
	    case "col":

	    	if($id !=""){
	    		$query = mysqli_query($conn, 'SELECT * FROM collection WHERE collection_id="'.$id.'"');
	    	}else{
	        	$query = mysqli_query($conn, 'SELECT * FROM collection');
	        }
			$rows = array();
			while($r = mysqli_fetch_assoc($query)) {
			    $rows[] = $r;
			}
			print json_encode($rows);
			

	    	break;

	    case "cat":
	    	if($id !=""){
	        	$query = mysqli_query($conn, 'SELECT * FROM category WHERE category_id="'.$id.'"');
	        }else{
	        	$query = mysqli_query($conn, 'SELECT * FROM category');
	        }
			$rows = array();
			while($r = mysqli_fetch_assoc($query)) {
			    $rows[] = $r;
			}
			print json_encode($rows);
			

	    	break;

	     case "item":
	     	if($id !=""){
				$query = mysqli_query($conn, 'SELECT * FROM item WHERE item_id="'. $id. '"');
	     	}else{
	        	$query = mysqli_query($conn, 'SELECT * FROM item');
	    	}
			$rows = array();
			while($r = mysqli_fetch_assoc($query)) {
			    $rows[] = $r;
			}
			print json_encode($rows);
			

	    	break;
	   
	}

	$conn->close();

	


?>