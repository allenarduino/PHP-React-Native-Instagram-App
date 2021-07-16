<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include('db.php');

require "vendor/autoload.php";
use \Firebase\JWT\JWT;
$key="xxxxxxxxkkkkkkllllllll";

$email=$_POST["email"];
$password=$_POST["password"];


//$email="email@gmail.com";
//$password="mypassword";
$sql="SELECT* FROM users WHERE email='".$email."'";

$result=mysqli_query($db,$sql);

$count=mysqli_num_rows($result);

//If email already exists?
if($count>0){
    //Authenticate the user
    //fetch user
    $row=mysqli_fetch_assoc($result);
    $encrypted_password=$row['password'];
  
    //checking hash password
    if(password_verify($password,$encrypted_password)){
        $payload=$row["user_id"];
        $jwt=JWT::encode($payload,$key);
        echo json_encode($jwt);
        //echo json_encode(array("messsage"=>"You're logged successfully"));
    }
    else{
        echo json_encode(array("error"=>"Invalid email or password"));
     
    }
    
    
}
else{
   
echo json_encode(array("error"=>"Please your email is not in our database"));

}
?>