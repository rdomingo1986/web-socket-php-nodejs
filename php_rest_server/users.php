<?php
require_once 'QBuilder/lib/QBuilder.php';
require_once 'JWT/jwt_helper.php';

class users {
  function __construct() {}
  
  public function signin() {
    $key = "example_key";

    $db = new QBuilder();
    $result = $db->select()
      ->from('users')
      ->where([
        ['login', $_POST['login']],
        ['password', md5($_POST['password'])]
      ])
      ->get()
      ->row();
    
    if($result === null) {
      return false;
    } else {
      $payload = array(
        "iss" => $_POST['login'],
        "iat" => 1356999524,
        "nbf" => 1357000000,
        "time" => time()
      );
      $token = JWT::encode($payload, $key);
      $db->query('UPDATE users SET jwt_string = "'.$token.'" WHERE users.id = "'.$result['id'].'"');
      return $token;
    }
  }
}
?>