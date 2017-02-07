
function dump(a) {
    console.log(a);
}

var originUrl = {
	href: window.location.href,
	origin: window.location.origin
}
var shorten = angular.module("shorten", ["ui.router","chart.js"]);

var domain = window.location.origin + "/#/"
var serverHost = 'http://103.53.231.8:3000/';

shorten.factory("ApiHandling", function ($http, $q) {
	return {
		// api short link
		makeShortLink: function (longLink) {
			var dataToServer = {link: longLink}
			dataToServer = JSON.stringify(dataToServer);
            var deferred = $q.defer();
		    $http.post(serverHost + "shorten/makeshorten", dataToServer)
		    .success(function(data, status, headers, config) {		
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.resolve(data);
			});
            return deferred.promise;
        },
        // api redirect link
        getFullLink: function(shortCode){
        	var dataToServer = {link: shortCode}
			dataToServer = JSON.stringify(dataToServer);
            var deferred = $q.defer();
		    $http.post(serverHost + "shorten/redirect", dataToServer)
		    .success(function(data, status, headers, config) {		
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.resolve(data);
			});
            return deferred.promise;
        },
       	// get all bit link for click
       	getAllShortLink: function(limit){
       		var dataToServer = {limit: limit}
			dataToServer = JSON.stringify(dataToServer);
            var deferred = $q.defer();
		    $http.post(serverHost + "statistic/allshortlink", dataToServer)
		    .success(function(data, status, headers, config) {		
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.resolve(data);
			});
            return deferred.promise;
       	},
       	//get all bit link for click
       	getTotalLastDays: function(id,days){
       		var dataToServer = {
       			id: id,
       			days: days
       		}
			dataToServer = JSON.stringify(dataToServer);
            var deferred = $q.defer();
		    $http.post(serverHost + "statistic/totallastdays", dataToServer)
		    .success(function(data, status, headers, config) {		
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.resolve(data);
			});
            return deferred.promise;
       	},

       	//get all bit link for click
       	getHitsByLocaiton: function(id){
       		var dataToServer = {
       			id: id
       		}
			dataToServer = JSON.stringify(dataToServer);
            var deferred = $q.defer();
		    $http.post(serverHost + "statistic/hitsbylocaiton", dataToServer)
		    .success(function(data, status, headers, config) {		
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.resolve(data);
			});
            return deferred.promise;
       	},

       	//get all bit link for click
       	getHitsByReferer: function(id){
       		var dataToServer = {
       			id: id
       		}
			dataToServer = JSON.stringify(dataToServer);
            var deferred = $q.defer();
		    $http.post(serverHost + "statistic/hitsbyreferer", dataToServer)
		    .success(function(data, status, headers, config) {		
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.resolve(data);
			});
            return deferred.promise;
       	},
	}
});