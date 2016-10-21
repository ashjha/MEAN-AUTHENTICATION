var app = angular.module('signupApp', []);
app.controller('signupCtrl', function($scope, $http,$window) {
   $scope.addUsr = function(){
      $http.post('/addusr', $scope.usr)
      .then(function(res){
         if(res.data.success){
           alert("user added successfully");
             $window.location.href ='/';
         }else {
             alert("Somthing wrong please try again");
             console.log(res);
         }
       },function(res){
         alert("Somthing wrong please try again");
         console.log(res);
       }
    );
   }
});