$(document).ready(function () {
  $('#send').on('click', function () {
    $.ajax({
      method: 'POST',
      url: 'http://localhost/php_rest_server/app.php?c=users&m=signin',
      data: {
        login: $('#login').val(),
        password: $('#password').val()
      },
      dataType: 'json',
      success: function (response) {
        if(response != false ) {
          localStorage.setItem('TOKEN',response);
          return location.href = 'http://localhost/web-client/dashboard.html'
        }
        alert('Usuario y clave invalidos');
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
});