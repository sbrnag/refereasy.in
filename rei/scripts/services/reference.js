'use strict';

app.factory('Ref',['FURL', '$firebaseArray', '$firebaseObject', '$q',
	            function(FURL, $firebaseArray, $firebaseObject, $q) {

	var ref = new Firebase(FURL);
	
	var Reference = {
		
		askReference: function(jobId, jobPosterId, uId) {
		   var def = $q.defer();
		   //save first userReference if some error happens alos file poster will know that some
		   //user wants reference
		   var userReferences = ref.child("/user_jobs/" + jobPosterId + "/" + jobId + "/references/" + uId);
           userReferences.set(true, function(err) {
    			if( err ) { 
    				def.reject(err); 
    			} else { 
    				var jobReferences =  ref.child("/jobs/" + jobId + "/references/" + uId);
    				jobReferences.set(true);
    				def.resolve(); 
    			}
  			});
           return def.promise;
		}
	};

	return Reference;

}]);