<?php

$conn=mysqli_connect("localhost","root","");
if(!$conn){
    echo "Connection Failed";
}
$json=file_get_contents('php://input');
$obj=json_decode($json,true);
$email=$obj['email'];
$password=$obj['password'];
$coverphoto="/images/wapbackground16.jpg";
$user_img="/images/avatar.jpg";
$bio="My bio";



$sql="SELECT* FROM users WHERE email=$email";
$result=mysqli_query($sql,$conn);
$numrows=mysqli_num_rows($result);
if ($numrows==null){
    $sql="
    INSERT INTO users(full_name,email,password,user_img,coverphoto,bio)
     VALUES ($name,$email,$password,$user_img,$coverphoto,$bio)";
  
}
else{
    echo  json_encode(array

    ("message"=>"User with email already exists")
);
}




?>