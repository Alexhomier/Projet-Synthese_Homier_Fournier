<?php
require_once("action/CommonAction.php");
require_once('PEAR.php');
require_once("Mail.php");
require_once("Mail/mime.php");

class AjaxActionForgotpwd extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        if(isset($_POST["username"])){
            $from = "M.A. Simulation e.ahomier@etu.cvm.qc.ca";
            $to = "Alexandre Homier a.homier@hotmail.com";
            $subject = "Hi!";
            $text = "Hi, It is a text message";
            $html = "It is a HTML message";
            $mime = new Mail_mime();
            $mime->setHTMLBody($html);
            $mime->setTXTBody($text);
            $body = $mime->get();

            $host = "mail.smtp2go.com";
            $port = "2525"; // 8025, 587 and 25 can also be used.
            $username = "e.ahomier@etu.cvm.qc.ca";
            $password = "Alexsmtp2go12";

            $headers = array ('From' => $from,
            'To' => $to,
            'Subject' => $subject);
            $headers = $mime->headers($headers);
            $smtp = Mail::factory('smtp',
                array (
                    'host' => $host,
                    'port' => $port,
                    'auth' => true,
                    'username' => $username,
                    'password' => $password
            ));

            $mail = $smtp->send($to, $headers, $body);

            if (PEAR::isError($mail)) {
                echo("" . $mail->getMessage() . "");
            } else {
                echo("Message successfully sent!");
            }
        }
        return [];
    }
}