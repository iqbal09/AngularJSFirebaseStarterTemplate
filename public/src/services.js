var app = angular.module('myApp');

app.factory('Notif', function($http, $q, $timeout) {
  var send = function(data){
    return $q(function(resolve, reject){
      $http({
          method: 'POST',
          url: 'https://fcm.googleapis.com/fcm/send',
          headers: {
            'Content-Type'   : 'application/json',
            'Authorization'  : 'key=AAAAXhMGVnA:APA91bGXekEWlUcSc8qQ0rHksr6t0sBH5VyhnQxvz3DKHMI1cCI1Q4VRA7YyXmfB5h9eQe4RY9EVFuLUUVhOzK2XeB9v8S3WCAqwIwnmJLZ4DVP5OqN0rkhiezRFrStfFJA7xDD3Xmyh'
           },
           data: data
      })
      .then(function(data){
          resolve(data);
      }, function(err){
          reject(err);
      });
    });
  };

  return {
    send: send
  };
})
