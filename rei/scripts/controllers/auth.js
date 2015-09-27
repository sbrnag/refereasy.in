app.controller('AuthController',['$scope', '$location', 'toaster', 'Auth', '$routeParams', '$rootScope', 
                         function($scope, $location, toaster, Auth, $routeParams, $rootScope) {

	$scope.register = function(user) {   
    Auth.register(user)
      .then(function() {
        toaster.pop('success', "Registered successfully");
        redirect($rootScope.redirectTo);
      }, function(err) {
        errMessage(err);
      });
  };

	$scope.login = function(user) {
     Auth.login(user)
      .then(function() {
        toaster.pop('success', "Logged in successfully");
        redirect($rootScope.redirectTo);
      }, function(err) {        
        errMessage(err);
      });    
	};

  $scope.loginWithFB = function() {
     Auth.authWithOAuthPopup('facebook')
      .then(function() {
        toaster.pop('success', "Logged in successfully");
        redirect($rootScope.redirectTo);
      }, function(err) {        
        errMessage(err);
      });    
  };

	$scope.changePassword = function(email, oldPass, newPass) {
     Auth.changePassword(email, oldPass, newPass)
      .then(function() {                        
        
        // Reset form
        $scope.email = '';
        $scope.oldPass = '';
        $scope.newPass = '';

        toaster.pop('success', "Password changed successfully");
      }, function(err) {
        errMessage(err);      
      });
  };

  $scope.resetPassword = function(email) {
     $scope.sentMail = false;
     Auth.resetPassword(email)
      .then(function() { 
        $scope.sentMail = true;                       
        toaster.pop('success', "Password reset email sent successfully!");
        /*$location.path('/resetPassword');*/
      }, function(err) {
        errMessage(err);      
      });
  };

  function redirect(redirectTo) {
      // For the paths Browsejobs, Myjobs and job
      if(redirectTo.indexOf("job") > -1) {
          $location.path(redirectTo);
      } else {
        //default
        $location.path('/browsejobs');
      };
  };

	function errMessage(err) {

    var msg = "Unknown Error...";

    if(err && err.code) {
      switch (err.code) {
        case "EMAIL_TAKEN": 
          msg = "This email has been taken"; break;          
        case "INVALID_EMAIL": 
          msg = "Invalid email"; break;          
        case "NETWORK_ERROR": 
          msg = "Network error"; break;          
        case "INVALID_PASSWORD": 
          msg = "Invalid password"; break;          
        case "INVALID_USER":
          msg = "Invalid user"; break;                  
      } 
    }   

    toaster.pop('error', msg);
  };


}]);