'use strict';

app.controller('PopUpController',['$scope', 'Job', 'toaster', '$location',
	                                function($scope, Job, toaster, $location) {
   
	$scope.postJob = function() {	

        Job.createJob($scope.job).then(function(ref) {
			toaster.pop('success', 'Job created successfully.');
			$scope.job = {title: '', skills: '', exp: '', location: '', company: '', expiry: ''};
			$location.path('/myjobs/');
		});
	};
	

	$scope.editJob = function(job, uid, userJobId) {
		Job.editJob(job, uid, userJobId);
		toaster.pop('success', "Job is updated.");
		$location.path('/myjobs/');
	};

}]);