<?php
//file_get_contents("sse.html");

header('Content-Type:text/event-stream');
header('Cache-Control:no-cache');

//Get the current time on server
$currentTime=date("h:i:s",time());


//send it in message
echo "data" . $currentTime ."\n\n";

flush();



?>