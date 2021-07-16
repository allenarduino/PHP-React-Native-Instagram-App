<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$valid_extensions = array('jpeg', 'jpg', 'png',);
//$uploadDir = 'uploads/'; 

 
// If form is submitted 
//if(isset($_POST['cat_name']) ||  isset($_POST['cat_image'])){ 
    if(isset($_POST['cat_name'])){

    // Get the submitted form data 
    $cat_name = $_POST['cat_name']; 

    /* Getting file name */
   //$filename = $_FILES['cat_image']['name'];

   //$folderPath = "/uploads";
   
   $file_name = $_FILES['cat_image']['name'];
   $file_tmp=$_FILES['cat_image']['tmp_name'];
   $location='uploads/'.$file_name;
   move_uploaded_file($file_tmp,$location);
  // move_uploaded_file($file_tmp, $file);
  


//include database configuration file
include_once 'db.php';
//insert form data in the database
$insert = $db->query("INSERT INTO categories (cat_name,cat_image) VALUES ('".$cat_name."','".$location."')");
//echo $insert?'ok':'err';

echo json_encode(
    array("message"=>"Image uploaded")
);

} 
            
        
 