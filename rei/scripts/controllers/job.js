'use strict';

app.controller('JobController', ['currentAuth', 'Auth', '$scope', '$routeParams', 'toaster', 'Job', '$location', 'Ref',
                   function(currentAuth, Auth, $scope, $routeParams, toaster, Job, $location, Ref) {

    $scope.currentUser = currentAuth;
    
    if($routeParams.jobId) {
  		var job = Job.getJob($routeParams.jobId);
  		$scope.selectedJob = job;	
	  };

    $scope.referMe = function(jobId, jobPosterId) {
        Ref.askReference(jobId, jobPosterId, $scope.currentUser.uid).then(function() {
        toaster.pop('success', "Referenced asked successfully");
        $location.path('/browsejobs');
      }, function(err) {
        console.log("Error while asking reference : " + err);
      });
    };  
  
}]);