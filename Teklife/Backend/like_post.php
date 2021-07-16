<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$valid_extensions = array('jpeg', 'jpg', 'png',);
//$uploadDir = 'uploads/'; 

require "vendor/autoload.php";
use \Firebase\JWT\JWT;
$key="xxxxxxxxkkkkkkllllllll";

$post_id=$_POST["post_id"];
$token=$_POST["token"];
$decoded_token=JWT::decode($token,$key,array('HS256'));
$user_id=json_decode($decoded_token);


include_once 'db.php';
//insert form data in the database
$insert = $db->query("INSERT INTO post_likes(post_liker,L_post_id) 
VALUES
 ('".$user_id."','".$post_id."')");
//echo $insert?'ok':'err';

echo json_encode(
    array("message"=>"Post Liked")
);


            
        
 