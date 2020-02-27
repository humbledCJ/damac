<?php

function response($text = '', $code = 200) {
	header_remove();
	http_response_code($code);
	header('Content-Type: application/json');
	header('Cache-Control: no-transform,public,max-age=300,s-maxage=900');
	header("Status: $code");
	echo json_encode(array('status' => $code < 300, 'message' => $text));
}

function send_error($text = '') {
	return response($text, 500);
}

function send_success($text = 'OK') {
	return response($text, 200);
}

$email       = $_POST['email'];
$name        = $_POST['name'];
$phone       = $_POST['phone'];
$target      = $_POST['target'];

$sender = "admin@hword.ru";
ini_set("SMTP", "mail.hword.ru");
ini_set("sendmail_from", $sender);

$headers = "From: ".$sender;
$message = "Новая заявка с сайта Headword.\r\nИмя: ".$name."\r\nТелефон: ".$phone."\r\nE-mail: ".$email."\r\nЗаметка: ".$target;
// mail($sender, "Новая заявка с сайта Headword", $message, $headers);
mail('iai40209@gmail.com', "Новая заявка с сайта Headword", $message, $headers);
return send_success();
?>
