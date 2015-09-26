'use strict';

app.factory('Ref',['FURL', 'Auth', '$firebaseArray', '$firebaseObject', function(FURL, Auth, $firebaseArray, $firebaseObject) {

    var currentUser = Auth.user;
	var ref = new Firebase(FURL);
	

	var Ref = {

		getReferences: function(jobId) {
			var references = $firebaseArray(ref.child('references').child(jobId));
			return references;
		},

		getReference: function(jobId, refId) {
			var reference = $firebaseObject(ref.child('references').child(jobId).child(refId));
			return reference;
		},

		getUserReferences: function(uId) {
			var references = $firebaseArray(ref.child('user_references').child(uId));
			return references;
		},

		saveReference: function(jobId) {

			// Create Ref Obj
			var reference = {
				sId: currentUser.uid
			};

            var references = $firebaseArray(ref.child('references').child(jobId));
		    return references.$add(reference).then(function(newReference) {

				var userReference = {
					refId: newReference.key()
				};

                var userReferences = $firebaseArray(ref.child('user_references').child(currentUser.uid).child(jobId));
				return userReferences.$add(userReference);
			});
			
		},

		deleteReference: function(refId) {
			var ref = this.getReferences(refId);
			return ref.$remove();
		}
	};

	return Ref;

}]);
	