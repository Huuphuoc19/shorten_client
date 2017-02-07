
function dump(a) {
    console.log(a);
}

var originUrl = {
	href: window.location.href,
	origin: window.location.origin
}
var shorten = angular.module("shorten", ["ui.router"]);
var domain = "http://cnxml.dev/#/"

shorten.factory("ApiHandling", function ($http, $q) {
	return {
		makeShortLink: function (longLink) {
			var dataToServer = {link: longLink}
			dataToServer = JSON.stringify(dataToServer);
            var deferred = $q.defer();
		    $http.post("http://localhost:3000/shorten/makeshorten", dataToServer)
		    .success(function(data, status, headers, config) {		
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.resolve(data);
			});
            return deferred.promise;
        },
        getFullLink: function(shortCode){
        	var dataToServer = {link: shortCode}
			dataToServer = JSON.stringify(dataToServer);
            var deferred = $q.defer();
		    $http.post("http://localhost:3000/shorten/redirect", dataToServer)
		    .success(function(data, status, headers, config) {		
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.resolve(data);
			});
            return deferred.promise;
        }
	}
});