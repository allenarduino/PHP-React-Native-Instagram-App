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

include('db.php');


$sql="DELETE FROM post_likes WHERE L_post_id='".$post_id."' AND post_liker='".$user_id."'";
if (mysqli_query($db,$sql)){
    echo json_encode(array("message"=>"Post Unliked"));
}

?>