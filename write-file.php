
<?php
$postdata = file_get_contents("php://input");

$eos = strlen($postdata) -6;
$json = substr($postdata, 5, $eos);

 $fh = fopen('json/testing123.json', 'w');
 fwrite($fh,$json);
 fclose($fh);


//$params = json_decode(file_get_contents('php://input'));


// Ta-da, using $_POST as normal; PHP is able to
// unserialize the AngularJS request no problem

?>