'use strict';

app.controller('BrowseController', ['currentAuth', '$scope', 'toaster', 'Job', '$location',
                  function(currentAuth, $scope, toaster, Job, $location) {

  $scope.currentUser = currentAuth;
  $scope.uid = currentAuth.uid;
  $scope.myJobs = Job.getUserJobs($scope.uid);
  $scope.jobs = Job.all;

  $scope.setSelecetedJob = function(job) {
    var jobId = job.jobId;
    $scope.userJobId = job.$id; 
    $scope.selectedJob = Job.getJob(jobId);
  };

	$scope.deleteJob = function(jobId) {
		Job.deleteJob(jobId).then(function() {
			toaster.pop('success', "This job is deleted successfully.");
      $location.path('/myjobs/');
		}, function(err) {
            errMessage(err);      
        });
	};

  function errMessage(err) {
    console.log(err);
  };

  $scope.jobLink = function(jobId) {
    $location.path('/job/' + jobId);
  };
  
}]);