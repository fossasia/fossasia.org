<?php
 
if(isset($_POST['email'])) {
	// Require the Swift Mailer library
	require_once 'lib/swift_required.php';

	// Enter your SMTP settings here...
	// You can look up your mail server and also see if it supports TLS by going to:
	// http://mxtoolbox.com/diagnostic.aspx 
	// and entering smtp:yourdomain.com 
	// You'll be given a report stating the server name to use and whether your server supports TLS.
	
	
	// Change smtp.example.org to your own server address below
	// Enter your email account username and password below also...
	
	// If your server supports a security layer (Gmail enforces use of 'tls' and port 587) change port accordingly (587 or 25 usually) and use 'tls' or 'ssl' as a third argument like so:
	// FOR GMAIL: 		$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 587, 'tls')
	// GENERIC TLS: 	$transport = Swift_SmtpTransport::newInstance('mail.mediumra.re', 25, 'tls')
	
	// If you choose not to use SSL or TLS then the following could work for you:
	// $transport = Swift_SmtpTransport::newInstance('mail.mediumra.re', 25)
	
	// or if you prefer/need to fall back to use PHP's inbuilt mail() function:
	// $transport = Swift_MailTransport::newInstance();
	
	$transport = Swift_SmtpTransport::newInstance('mail.yourdomain.com', 25, 'tls' )
	  ->setUsername('email@domain.com')     
	  ->setPassword('p@55w0rd')
	  ;

	
	$mailer = Swift_Mailer::newInstance($transport);
	
	
	// Creating the message text using fields sent through POST
	
	foreach ($_POST as $key => $value)
		$messageText .= ucfirst($key).": ".$value."\n\n";
	
	
	
	
	// You can change "A message from Meetup Template Form" to your own subject if you want.
	$message = Swift_Message::newInstance('A message from Meetup Template Form')
	  ->setFrom(array($_POST['email'] => $_POST['name']))
	  ->setTo(array('email@yourdomain.com' => 'John Doe'))->setBody($messageText);
//                           ^                    ^
//       Your email address_/          Your name_/

	  

	// Send the message or catch an error if it occurs.
	try{
		echo($mailer->send($message));
	}
	catch(Exception $e){
		echo($e->getMessage());
	}
	exit;
}
 
?>