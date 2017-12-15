
var app = angular.module('myApp.controller', []);


app.directive('ckEditor', function () {
    return {
      require: '?ngModel',
      link: function (scope, elm, attr, ngModel) {
        var ck = CKEDITOR.replace(elm[0]);
        if (!ngModel) return;
        ck.on('instanceReady', function () {
          ck.setData(ngModel.$viewValue);
        });
        function updateModel() {
          scope.$apply(function () {
            ngModel.$setViewValue(ck.getData());
          });
        }
        ck.on('change', updateModel);
        ck.on('key', updateModel);
        ck.on('dataReady', updateModel);
  
        ngModel.$render = function (value) {
          ck.setData(ngModel.$viewValue);
        };
      }
    };
  });

/**
 *  Start controller BodyCtrl
 */
    app.controller("BodyCtrl", ["$scope", "$firebaseArray",
        function($scope, $firebaseArray, $timeout) {
          
            console.log("ITS WORK !!!");

        }
    ]);
/**
 *  End controller BodyCtrl
 */

/**
 *  Start controller HomeCtrl
 */
    app.controller("HomeCtrl", function($scope, $firebaseArray, $timeout) {

       console.log("ITS WORK !!!");


      



    });
/**
 *  End controller HomeCtrl
*/


/**
 *  Start controller CategoryCtrl
 */
app.controller("CategoryCtrl", function($scope, $firebaseArray, $timeout, $route) {
    var rootRef         = firebase.database().ref().child("category");
    $scope.categories   = $firebaseArray(rootRef);

    $scope.shForm           = false;
    $scope.shTable          = true;

        //Show Form
        $scope.showForm = function(data){
            $scope.shForm           = true;
            $scope.shTable          = false;
            $scope.shFormInput      = true;
            if(data)
            {
                $scope.tipeForm =  "Edit Category";
                $scope.key              = data.$id;
                console.log( data.$id );
                $scope.photo_url         = data.image_url;
                $scope.photo_name        = data.image;
                $scope.name             = data.category_name;
                $scope.images           = data.image_url;
            }else{
                $scope.tipeForm =  "Add Category";
                $scope.key               = "";
                $scope.nama              = "";
                $scope.photo_name        = "";
                $scope.photo_url         = "img/default.png";
            }
        };                      

        $scope.proccessData = function() {
            var timeStamp   = $scope.id_img;
                //On Edit Fuction
                if($scope.key){
                
                    var dataInfo = {
                        id                 : $scope.key,
                        category_name      : $scope.name,
                        image              : $scope.photo_name,
                        image_url          : $scope.photo_url
                        // foto_name:$scope.foto,
                        // foto_url:$scope.foto_url,
                    };

                    var newRootRef     = firebase.database().ref().child("category");
                    newRootRef.child($scope.key).set(dataInfo);
                    $scope.categories  = $firebaseArray(newRootRef);
                    console.log("Input Success");
                
                //On Add Fuction
                }else{

                    var dataInfo = {
                        id                 : timeStamp,
                        category_name      : $scope.name,
                        image              : $scope.photo_name,
                        image_url          : $scope.photo_url
                        // foto_name:$scope.foto,
                        // foto_url:$scope.foto_url,
                    };

                    var newRootRef     = firebase.database().ref().child("category");
                    newRootRef.child(timeStamp).set(dataInfo);
                
                    //get new Data
                    $scope.categories  = $firebaseArray(newRootRef);
                    console.log("Input Success");

                }
                
            $route.reload();
            $scope.shTable  = true;
            $scope.shFormInput = $scope.shFormEdit = $scope.shDetail = false;
        
        };


    
     
        // Uploading File
        document.getElementById("foto_button").addEventListener('change', function(e)
        {
            $scope.shUploader   = true;
            //if old file exist, delete file first
            if($scope.photo_name !== ""){
                uploader.value = 0;
                //delete_file($scope.foto_name);
            }

            // Get file
            var file = e.target.files[0];
            var datetime    = new Date();
            var timeStamp   = datetime.getTime();
            var fileName    = file.name;

            // Create e storage ref
            var storageRef = firebase.storage().ref("images_category/"+fileName);
            // console.log(file.name);
            // Upload file
            var task = storageRef.put(file);
            //Update progress bar
            task.on('state_changed',
                function progress(snapshot){
                    //make progress
                    $scope.shUploader = true;
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                },
                function error(err)
                {
                    //if error
                },
                function complete()
                {   //if complete
                    console.log("complete");
                    var get_url_name    = task.snapshot.downloadURL;
                    $scope.images       = get_url_name;
                    $scope.photo_name    = fileName;
                    $scope.photo_url     = get_url_name;
                    $scope.id_img       = timeStamp;
                }
            );
        });



        $scope.deleteForm = function(data){
            console.log("Proses Delete"); 
            var newRootRef     = firebase.database().ref().child("category");
            newRootRef.child(data.$id).remove();
            //get new Data
            console.log("Proses Hapus Gambar");
            console.log(data.image);
            delete_file(data.image);
            $route.reload();
       };




        //Delte Img
        function delete_file(img_name)
        {
            var desertRef = firebase.storage().ref("images_category/"+img_name);
            // Delete Old file
            desertRef.delete().then(function() {
                // Old File deleted successfully
            }).catch(function(error) {
                // Uh-oh, an error occurred!
            });

             $route.reload();
        };
    
          
    
    
    
});
/**
 *  End controller CategoryCtrl
*/


app.controller("RecipeCtrl", function($scope, $firebaseArray, $timeout, $route) {
    var rootRef         = firebase.database().ref().child("recipe");
    var catRef          = firebase.database().ref().child("category");
    $scope.recipes      = $firebaseArray(rootRef);
    $scope.categories   = $firebaseArray(catRef);

    $scope.shForm           = false;
    $scope.shTable          = true;


 //Show Form
 $scope.showForm = function(data){
    $scope.shForm           = true;
    $scope.shTable          = false;
    $scope.shFormInput      = true;
    if(data)
    {
        $scope.typeForm =  "Edit Recipe";
        $scope.key              = data.$id;
        console.log( data.$id );
        $scope.photo_url         = data.image_url;
        $scope.photo_name        = data.image;
        $scope.name             = data.name;
        $scope.images           = data.image_url;
        $scope.time             = data.time;
        $scope.content          = data.description;
        $scope.selectedCategory = data.category;
    }else{
        $scope.typeForm =  "Add Recipe";
        $scope.key               = "";
        $scope.nama              = "";
        $scope.photo_name        = "";
        $scope.content           = "";
        $scope.time              = "";
        $scope.photo_url         = "img/default.png";
    }
};     


    $scope.proccessData = function() {
        var timeStamp   = $scope.id_img;
            //On Edit Fuction
            if($scope.key){
            
                var dataInfo = {
                    id                 : $scope.key,
                    name               : $scope.name,
                    category           : $scope.selectedCategory,
                    description        : $scope.content,
                    image              : $scope.photo_name,
                    image_url          : $scope.photo_url,
                    time               : $scope.time
                    // foto_name:$scope.foto,
                    // foto_url:$scope.foto_url,
                };

                var newRootRef     = firebase.database().ref().child("recipe");
                newRootRef.child($scope.key).set(dataInfo);
                $scope.categories  = $firebaseArray(newRootRef);
                console.log("Input Success");
            
            //On Add Fuction
            }else{

                var dataInfo = {
                    id                 : timeStamp,
                    name               : $scope.name,
                    category           : $scope.selectedCategory,
                    description        : $scope.content,
                    image              : $scope.photo_name,
                    image_url          : $scope.photo_url,
                    time               : $scope.time
                    
                    // foto_name:$scope.foto,
                    // foto_url:$scope.foto_url,
                };

                var newRootRef     = firebase.database().ref().child("recipe");
                newRootRef.child(timeStamp).set(dataInfo);
            
                //get new Data
                $scope.categories  = $firebaseArray(newRootRef);
                console.log("Input Success");

            }
            
        $route.reload();
        $scope.shTable  = true;
        $scope.shFormInput = $scope.shFormEdit = $scope.shDetail = false;
    
    };
    

     // Uploading File
     document.getElementById("foto_button").addEventListener('change', function(e)
     {
         $scope.shUploader   = true;
         //if old file exist, delete file first
         if($scope.photo_name !== ""){
             uploader.value = 0;
             //delete_file($scope.foto_name);
         }

         // Get file
         var file = e.target.files[0];
         var datetime    = new Date();
         var timeStamp   = datetime.getTime();
         var fileName    = file.name;

         // Create e storage ref
         var storageRef = firebase.storage().ref("images_recipes/"+fileName);
         // console.log(file.name);
         // Upload file
         var task = storageRef.put(file);
         //Update progress bar
         task.on('state_changed',
             function progress(snapshot){
                 //make progress
                 $scope.shUploader = true;
                 var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 uploader.value = percentage;
             },
             function error(err)
             {
                 //if error
             },
             function complete()
             {   //if complete
                 console.log("complete");
                 var get_url_name    = task.snapshot.downloadURL;
                 $scope.images       = get_url_name;
                 $scope.photo_name    = fileName;
                 $scope.photo_url     = get_url_name;
                 $scope.id_img       = timeStamp;
             }
         );
     });






});




/**
 *  Multiple Upload
*/
    app.controller('FileUploadCtrl', function($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'js/upload.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    });
/**
 *  End Multiple Upload
*/

/**
 *  Edit Function
 */



    app.filter("countLike", function($firebaseArray){
        return function(ObjectId){
            // Your logic
            var total = 0;
            var lookRef     = firebase.database().ref().child("likes").child(ObjectId);
            lookRef.on('value', function(data) {
                data.forEach(function(data) {
                    total++;
                });
            });
            return total;
        };
    });

    app.filter("countComment", function($firebaseArray){
        return function(ObjectId){
            // Your logic
            var total = 0;
            var lookRef     = firebase.database().ref().child("comments").child(ObjectId);
            lookRef.on('value', function(data) {
                data.forEach(function(data) {
                    total++;
                });
            });
            return total;
        };
    });

    app.filter("countDisLike", function($firebaseArray){
        return function(ObjectId){
            // Your logic
            var total = 0;
            var lookRef     = firebase.database().ref().child("dislikes").child(ObjectId);
            lookRef.on('value', function(data) {
                data.forEach(function(data) {
                    total++;
                });
            });
            return total;
        };
    });

    app.filter("checkStatus", function($firebaseArray){
        return function(status){
            // Your logic
            if(status === true || status === "true" || status === "" || status === undefined)
            {
                status = true;
            }
            else{
                status = false;
            }
            return status;
        };
    });

    app.filter("getNameUser", function($firebaseArray){
        return function(ObjectId){
            // Your logic
            // var lookRef     = firebase.database().ref().child("members").child(ObjectId);
            // lookRef.on('value', function(data) {
            //     data.forEach(function(data) {
            //         console.log(data.val().name);
            //         return data.val().name;
            //     });
            // });
        };
    });


    function timeConverter(t) {
   var a = new Date(t * 1000);
    var today = new Date();
    var yesterday = new Date(Date.now() - 86400000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
        return 'today, ' + hour + ':' + min;
    else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
        return 'yesterday, ' + hour + ':' + min;
    else if (year == today.getFullYear())
        return date + ' ' + month + ', ' + hour + ':' + min;
    else
        return date + ' ' + month + ' , ' + hour + ':' + min;
}
