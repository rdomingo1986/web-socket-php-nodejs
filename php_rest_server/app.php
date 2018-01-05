<?php
  try {

    // require_once 'library/RequestValidator.php';
    // $request = new RequestValidator();
    // $request->isValid();

    $file = $_GET['c'];
    $action = $_GET['m'];

    require_once $file.'.php';
    $watcher = new $file();
    $response = $watcher->$action();
    echo json_encode($response);

} catch(InvalidArgumentException $e) {

    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    echo json_encode(array(
      'success' => false,
      'message' => $e->getMessage()
    ));

}
?>