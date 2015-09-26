'use strict';

app.factory('Job',['FURL', 'Auth', '$firebaseArray', '$firebaseObject', function(FURL, Auth, $firebaseArray, $firebaseObject) {

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
			var profileImage = currentUser.profile.gravatar;
			if(profileImage == 'undefined' || profileImage == null) {
			    profileImage = currentUser.facebook.profileImageURL;
			}
			job.gravatar = profileImage;
			var profileName = currentUser.profile.name;
			if(profileName == 'undefined' || profileName == null) {
                profileName = currentUser.facebook.displayName;
			}
	        job.poster = profileName;
	        job.uid = currentUser.uid;

	        return jobs.$add(job).then(function(newJob) {

				// Create User-Jobs 
				var userJob = {
					jobId: newJob.key(),
					title: job.title,
					gravatar: job.gravatar,
					datetime: job.datetime
				};

                var userJobs = $firebaseArray(ref.child('user_jobs').child(currentUser.uid));
				return userJobs.$add(userJob);
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
	