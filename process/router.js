
// handle url page

shorten.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {    
	$urlRouterProvider.otherwise("/redirect");
    // xu li duong dan cho menu
    $stateProvider
    .state("index", {
        url: "/index",
        templateUrl: "templates/index.htm",
        controller: "indexController",
        controllerAs: "indexCtrl",
        // 
        resolve: {
           
        }
    })
    .state("statistic",{
    	 url: "/statistic",
        templateUrl: "templates/statistic.htm",
        controller: "statisticController",
        controllerAs: "statisticCtrl",
        // 
        resolve: {
           
        }
    })
    .state("redirect",{
        url: "/redirect",
        templateUrl: "templates/redirect.htm",
        controller: "redirectController",
        controllerAs: "redirectCtrl",
        resolve: {
           
        }
    });
});