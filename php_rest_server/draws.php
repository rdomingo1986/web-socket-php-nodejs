<?php
require_once 'QBuilder/lib/QBuilder.php';
require_once 'QBuilder/config/DBConfig.php';
require_once 'RestClient/httpful.phar';

class draws {
  function __construct() {}
  
  public function loadDraw() {
    $key = "example_key";

    $db = new QBuilder();
    $db->connect(new DBConfig());
    $db->query('INSERT INTO draws (timestamp) VALUES ("'.@date('Y-m-d H:i:s', time()).'")');

    $response = \Httpful\Request::get('http://localhost:3000/endpoint')->send();


    return $response->body;
  }
}
?>