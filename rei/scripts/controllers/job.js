'use strict';

app.controller('JobController', ['Auth', '$scope', '$routeParams', 'toaster', 'Job', '$location',
                   'Ref', function(Auth, $scope, $routeParams, toaster, Job, $location, Ref) {

    $scope.currentUser = Auth.user;
    $scope.signedIn = Auth.signedIn;
    

    if($routeParams.jobId) {
		var job = Job.getJob($routeParams.jobId);
		setSelectedTask(job);	
	}	

    function setSelectedTask(job) {
		$scope.selectedJob = job;
	};
  
}]);