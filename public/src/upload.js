$(document).ready(function() {
    /**
        UPLOAD
              **/
     
    $("#foto_button").val("");
    $("#uploader").show();
     
    var btn_foto        = document.getElementById("foto_button");
    var progress_upload = document.getElementById("uploader");
    
    // listen for file selection
    
    btn_foto.addEventListener('change', function(e)
    {
    var foto_val = $("#foto").val();
    //if old file exist, delete file first
    if(foto_val !== 0)
    {
        delete_file(foto_val);
    }
    
    $("#uploader").show();
    
    // Get file
    var file = e.target.files[0];
    // Create e storage ref
    var storageRef = firebase.storage().ref('images/'+file.name);
    // Upload file
    var task = storageRef.put(file);
    
    //Upadate progress bar
    task.on('state_changed',
        function progress(snapshot){
        //make progress
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
        },
        function error(err)
        {
        //if error
        },
        function complete()
        { //if complete
            var get_url_name =  task.snapshot.downloadURL;
            $('#image').attr('src',get_url_name);
            $("#foto").val(file.name);
            $("#foto_url").val(get_url_name);
        }
    
    );
    
    });
    
    function delete_file(img_name)
    {
      var desertRef = firebase.storage().ref().child('images/'+img_name);
      // Delete Old file
      desertRef.delete().then(function() {
        // Old File deleted successfully
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });
    }
    /**
      END UPLOAD
              **/
    });