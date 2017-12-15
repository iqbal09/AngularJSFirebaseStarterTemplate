// Initialize Firebase
var config = {
    //FILL WITH YOUR OWN FIREBASE CONFIG
  };
  firebase.initializeApp(config);

//Check Login True / False
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // if login
  }
  else{
    window.location.href='index.html';
  }
});

// PROSES LOGOUT
$(document).on('click','#do_logout',function(){

  firebase.auth().signOut().then(function() {
    console.log("Logged out!");
  }, function(error) {
    console.log(error.code);
    console.log(error.message);
  });

});
