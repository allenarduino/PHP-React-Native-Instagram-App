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
$target_file = $target_dir . basename($_FILES['post_media']['name']);

$post_caption=$_POST["post_caption"];
$token=$_POST["token"];
$decoded_token=JWT::decode($token,$key,array('HS256'));
$user_id=json_decode($decoded_token);


move_uploaded_file($_FILES['post_media']['tmp_name'], $target_file);
//include database configuration file
include_once 'db.php';
//insert form data into the database
$insert = $db->query("INSERT INTO posts(post_caption,post_media,owner_id) 
VALUES
 ('".$post_caption."','".$target_file."','".$user_id."')");

mysqli_close($db);
echo json_encode(
    array("message"=>"Post Created")
);


            
        
 