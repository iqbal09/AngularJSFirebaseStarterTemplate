$(document).ready(function() {
    
    // check_login();
    $("#alert").attr('class', '');
    $("#alert").hide();
    
    /** BUTTON **/
    /** do login **/
    $(document).on('click','#do_login',function(){
    
      console.log("DIKLIK");
    
      $("#alert").attr('class', '');
    
      //show loading
      $("#alert").addClass('alert alert-danger');
      $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> please wait...");
      $("#alert").show();
    
      var email         = $("#email").val();
      var password      = $("#password").val();
      var isAdmin       = false;
      var nama          = "";
      //check, is it admin or not?
      var rootRef = firebase.database().ref();
      var query   = rootRef.child('admins').orderByChild('email').equalTo(email);
      query.on("child_added", function(data) {
        console.log("Equal to filter: " + data.val().nama);
    
        var isAdmin       = data.val().status;
          var nama       = data.val().nama;
    
          console.log("Status Admin" + isAdmin);
    
          if(email.length === 0){
            $("#alert_email").html("email can't be empty");
            $("#email").focus();
    
            $("#alert").addClass('alert alert-danger');
            $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> username can't be empty");
            $("#alert").show();
          }
          else if(password.length === 0){
            $("#alert_password").html("password can't be empty");
            $("#password").focus();
    
            $("#alert").addClass('alert alert-danger');
            $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> password can't be empty");
            $("#alert").show();
          }
          else{
    
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              if(error.code == "auth/user-not-found")
              {
                $("#alert").addClass('alert alert-danger');
                $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> mail's not found");
                $("#alert").show();
              }
              else if(error.code == "auth/wrong-password"){
                $("#alert").addClass('alert alert-danger');
                $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> wrong mail or password");
                $("#alert").show();
              }
              console.log(error.code);
              console.log(error.message);
            });
          }
      });
    
      setTimeout(function(){
        console.log(isAdmin);
        console.log("NAMA" + nama);
          if(isAdmin === false)
          {
              $("#alert").addClass('alert alert-danger');
              $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> you're not admin");
              $("#alert").show();
          }
      }, 5000); //hide loader after 5000 ms (5s)
    
    });
    
    /** do logout **/
    $(document).on('click','#do_logout',function(){
    
      firebase.auth().signOut().then(function() {
         console.log("Logged out!");
         $.removeCookie('user_session');  //remove cookies
      }, function(error) {
         console.log(error.code);
         console.log(error.message);
      });
    
    });
    /** END BUTTON **/
    
    
    /** CHECK LOGIN, SHOW AND HIDE ALERT **/
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user.emailVerified);
    
    
            // alert(user.email);
            $("#alert").addClass('alert alert-success');
            $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> LOGIN ");
            $("#alert").show();
            $("#do_logout").show();
            //goto another page
            window.location.href = 'home.html';
    
        }
        else{
            $("#alert").show();
            $("#do_logout").hide();
        }
    });
    
    });
    