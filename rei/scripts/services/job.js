'use strict';

app.factory('Job',['FURL', 'Auth', '$firebaseArray', '$firebaseObject', '$q',
	            function(FURL, Auth, $firebaseArray, $firebaseObject, $q) {

    var currentUser = Auth.user;
	var ref = new Firebase(FURL);
	var jobs = $firebaseArray(ref.child('jobs'));

	var Job = {
		all: jobs,

		getJob: function(jobId) {
			return $firebaseObject(ref.child('jobs').child(jobId));
		},

		getUserJobs: function(uid) {
			var userJobs = $firebaseArray(ref.child('user_jobs').child(uid));
			return userJobs;
		},

		getUserJob: function(uid, jobRef) {
			var userJob = $firebaseObject(ref.child('user_jobs').child(uid).child(jobRef));
			return userJob;
		},

		createJob: function(job) {
			job.datetime = Firebase.ServerValue.TIMESTAMP;
			job.gravatar = currentUser.profile.gravatar;
			job.poster = currentUser.profile.name;
	        job.uid = currentUser.uid;

	        return jobs.$add(job).then(function(newJob) {
                
                var userJob = $firebaseObject(ref.child('user_jobs').child(currentUser.uid).child(newJob.key()));
				userJob.title = job.title;
				userJob.gravatar = job.gravatar;
				userJob.datetime = job.datetime;
				return userJob.$save();
			});
		},

		editJob: function(job, uid, userJobId) {
			job.datetime = Firebase.ServerValue.TIMESTAMP;
			var jobId = job.$id;
            var jobRef = ref.child('jobs').child(jobId);
            jobRef.set({title: job.title, skills: job.skills, exp: job.exp, location: job.location, 
            	        company: job.company, expiry: job.expiry, datetime: job.datetime, gravatar: job.gravatar,
            	        poster: job.poster, uid: job.uid});

            var userJobRef = ref.child('user_jobs').child(uid).child(userJobId);
            userJobRef.set({jobId: jobId,title: job.title, gravatar: job.gravatar, datetime: job.datetime});

		},

		deleteJob: function(jobId) {
			var job = this.getJob(jobId);
			return job.$remove();
		}

	};

	return Job;

}]);
	