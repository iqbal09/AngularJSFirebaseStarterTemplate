(function(){
    "use strict";
    var app = angular.module('myApp', ['myApp.controller','ngCkeditor','ngRoute','firebase','angularFileUpload']);
    

    
    //Setting Run
    app.run(["$rootScope", function($rootScope) {
            $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
                // We can catch the error thrown when the $requireSignIn promise is rejected
                // and redirect the user back to the home page
                if (error === "AUTH_REQUIRED") {
                    window.location.href='index.html';
                }
            });
        }
    ]);


    app.config(function($routeProvider) {
        $routeProvider
        .when("/home", {
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        })
        .when("/category", {
            templateUrl : "category.html",
            controller  : "CategoryCtrl",
        })
        .when("/recipe", {
            templateUrl : "recipe.html",
            controller  : "RecipeCtrl",
        })
        .otherwise({
            templateUrl : "dashboard.html",
            controller  : "HomeCtrl",
        });
    });
      
    
    
    
    })();
    