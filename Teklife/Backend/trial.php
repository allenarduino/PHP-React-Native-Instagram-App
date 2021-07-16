<?php
$max=$_GET["max"];
$max_converted=json_decode($max,true);
echo $max_converted["id"];

//foreach($max_converted as $item){
 //   echo $item["id"];
//}
?>