var app = angular.module('loginApp', []);
app.controller('loginCtrl', function($scope, $http,$window) {
   $scope.login = function(){
      $http.post('/login', $scope.usr)
      .then(function(res){
         if(res.data.success){
             $window.location.href ='/pet-selection';
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