<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include('db.php');


require "vendor/autoload.php";
use \Firebase\JWT\JWT;
$key="xxxxxxxxkkkkkkllllllll";


function getAuthorizationHeader(){
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    }
    else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}

/**Get token from header** */

function getBearerToken() {
$headers = getAuthorizationHeader();
// HEADER: Get the access token from the header
if (!empty($headers)) {
    if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
        return $matches[1];
    }
}
return null;
}


while(true){
clearstatcache();

$data=$_GET["data"];
$data=json_decode($data,true);
$post_id=$data["post_id"];
$last_ajax_call=$data["max"];
$token=getBearerToken();



$decoded_token=JWT::decode($token,$key,array('HS256'));
$user_id=json_decode($decoded_token);


$sql="SELECT* FROM post_comments,users WHERE post_comments.C_post_id='".$post_id."'
AND users.user_id=post_comments.user_id";


$result=mysqli_query($db,$sql) or die(mysqli_error($db));//this will throw mysql error


$sql3="SELECT COUNT(*) as comment_count FROM post_comments";
$result3=mysqli_query($db,$sql3);
$row3= mysqli_fetch_assoc($result3);
$comment_count=$row3["comment_count"];

$row=mysqli_fetch_all($result,MYSQLI_ASSOC);

   
if($last_ajax_call==null||$comment_count>$last_ajax_call){
   echo json_encode(array("comments"=>$row,"comment_count"=>$comment_count),JSON_NUMERIC_CHECK); 
   break;
}
else{
    sleep(1);
    continue;
}
} 

?>



