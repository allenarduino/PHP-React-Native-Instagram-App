<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$valid_extensions = array('jpeg', 'jpg', 'png',);
//$uploadDir = 'uploads/'; 

require "vendor/autoload.php";
use \Firebase\JWT\JWT;
$key="xxxxxxxxkkkkkkllllllll";

//$file_name =$_FILES['post_media']['name'];
//$file_tmp=$_FILES['post_media']['tmp_name'];
$target_dir = 'uploads/';
$target_file = $target_dir . basename($_FILES['user_img']['name']);
$token=$_POST["token"];
$decoded_token=JWT::decode($token,$key,array('HS256'));
$user_id=json_decode($decoded_token);


move_uploaded_file($_FILES['user_img']['tmp_name'], $target_file);
//include database configuration file
include_once 'db.php';
//insert form data into the database

$sql="UPDATE users SET user_img='".$target_file."' WHERE user_id='".$user_id."'";

if(mysqli_query($db,$sql)){

   echo json_encode("Profile Picture Updated");
}
else{
   echo die(mysqli_error($db));
}


            
        
 ?>