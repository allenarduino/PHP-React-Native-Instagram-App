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
$user_id=$data["user_id"];
$last_ajax_call=$data["max"];
$token=getBearerToken();



$decoded_token=JWT::decode($token,$key,array('HS256'));
$auth_user_id=json_decode($decoded_token);










$sql1="SELECT* FROM users WHERE user_id='".$user_id."'";



$sql2="SELECT  p_id,post_caption,post_media,owner_id,u.full_name,u.user_img,u.user_id,
(SELECT post_liker FROM post_likes pl WHERE pl.post_liker=$auth_user_id AND pl.L_post_id=p.p_id) as post_liker,
(SELECT COUNT(*) FROM post_comments WHERE p.p_id=post_comments.C_post_id )as total_comments,
(SELECT COUNT(*) FROM post_likes WHERE p.p_id=post_likes.L_post_id) as total_likes
FROM posts p,users u WHERE u.user_id=p.owner_id AND p.owner_id=$user_id ORDER BY p.p_id DESC";

$result1=mysqli_query($db,$sql1);
$count1=mysqli_num_rows($result1);

$result2=mysqli_query($db,$sql2);
$count2=mysqli_num_rows($result2);

$sql3="
select(select count(*) from posts)
+(select count(*) from post_comments)
+(select count(*) from users)
+ (select count(*) from post_likes) as profile_count from dual
 
";
$result3=mysqli_query($db,$sql3);
$row3= mysqli_fetch_assoc($result3);
$profile_count=$row3["profile_count"];


if($last_ajax_call==null||$profile_count>$last_ajax_call){
    $row1=mysqli_fetch_all($result1,MYSQLI_ASSOC);
    $row2=mysqli_fetch_all($result2,MYSQLI_ASSOC);
    echo json_encode(array("my_profile"=>$row1,"my_posts"=>$row2,"profile_count"=>$row3),JSON_NUMERIC_CHECK);
  break;
}
else{
    sleep(1);
    continue;
 }
}
?>



