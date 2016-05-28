<?php
	include 'connection.php';

	$t = $_GET['type'];

	if(isset($_GET['id']))
	{
	    $id = $_GET['id'];
	} else {
		$id = "";
	}

	if(isset($_GET['coll']))
	{
	    $coll = $_GET['coll'];
	} else {
		$coll = "";
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
	     	}else if($coll !=""){
	        	$query = mysqli_query($conn, 'SELECT * FROM item WHERE collection_id="'. $coll. '"');
	    	}else{
	    		$query = mysqli_query($conn, 'SELECT * FROM item');
	    	}
			$rows = array();
			while($r = mysqli_fetch_assoc($query)) {
			    $rows[] = $r;
			}
			print json_encode($rows);			

	    	break;

	    case "dash":
	    	//$items = mysqli_query($conn, 'SELECT * FROM item');
	    	//$cats = mysqli_query($conn, 'SELECT * FROM category');
	    	//$colls = mysqli_query($conn, 'SELECT * FROM collection');

	    	$items = mysqli_num_rows(mysqli_query($conn, 'SELECT * FROM item'));
	    	$cats = mysqli_num_rows(mysqli_query($conn, 'SELECT * FROM category'));
	    	$colls = mysqli_num_rows(mysqli_query($conn, 'SELECT * FROM collection'));

	    	$post_data = array('items' => $items, 
	    		'categories' => $cats,
	    		'collections' => $colls);

	    	print json_encode($post_data);

	    	break;
	   
	}

	$conn->close();

	


?>