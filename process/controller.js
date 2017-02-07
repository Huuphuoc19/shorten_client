
// index contrller
shorten.controller("indexController", function ($scope,ApiHandling,Helper){
    var vm = this;

    // make short link when user click 
    vm.makeShorten = function(){
        var info = $("#shortened_info");
        info.hide();
        var longLink = vm.longLink;
        // if input is url
        if(longLink){
            ApiHandling.makeShortLink(longLink)
            .then(function(data){
                dump(data);
                var url = Helper.getUrl(longLink);
                vm.shortLink = domain + data.link;
                vm.longLinkTitle = Helper.removeProtocol(longLink);
                vm.longLinkOrigin = url.hostname;
                info.slideDown();
            },function(err){
                dump(err);
            });
        }
    }
    // make copy
    vm.makeCopy = function(){
        
    }

});

// redirect controller
shorten.controller("redirectController", function ($scope,$window,ApiHandling,Helper){
    var vm = this;
    var shortCode = originUrl.href.substring(originUrl.origin.length + 3);
    //redirect to index
    if(shortCode == ""){
        $window.location.href = domain + "index";
    }
    else{
        var reUrl = null;
        var parser = Helper.getUrl(referrer);
        if(parser != null){
            reUrl = parser.protocol + "//" + parser.hostname;
            // if rerferr from client side
            // if((reUrl + "/#/") == domain){
            //     reUrl = null;
            // }
        }

        ApiHandling.getFullLink(shortCode,reUrl)
        .then(function(data){
            if(data.longlink != -1){
                $window.location.href = data.longlink;
                vm.message = "Redirect";
            }else{
                vm.message = "Not found";
            }
        },function(err){
            dump(err);
        });
    }

});

// statistic controller
shorten.controller("statisticController", function ($scope,ApiHandling,Helper,dateFilter){
    $scope.domain = domain;
    $scope.totalLink;
    $scope.selected;

    $scope.selectedInfo;

    // append link for left list
    ApiHandling.getAllShortLink(-1)
    .then(function(data){
        if(data){
            $scope.links = data;
            $scope.totalLink = data.length;
            $scope.selected = data[0].id;
            $scope.selectedInfo = data[0];
        }
    },function(err){
        dump(err);
    });

    // info of link
    $scope.getStatisticShortLink = function(link){
        $scope.selected = link.id;
        $scope.selectedInfo = link;
        $scope.locationChartInfo = {
            total: null,
            labels: [],
            data: []
        }
        $scope.refererChartInfo = {
            total: null,
            labels: [],
            data: []
        }

        // append link for left list
        ApiHandling.getTotalLastDays(link.id,30)
        .then(function(dataResult){
            $scope.bar_labels = dataResult.date;

            $scope.bar_data = [
                dataResult.hits
            ];
        },function(err){
            dump(err);
        });

        // location chart
        ApiHandling.getHitsByLocaiton(link.id)
        .then(function(dataResult){
            $("#location_chart").show();
            $scope.location_labels = dataResult.location;
            $scope.location_data = dataResult.hits;
            var total = Helper.totalArray(dataResult.hits);
            $scope.locationChartInfo.total = total;
            $scope.locationChartInfo.labels = dataResult.location;
            $scope.locationChartInfo.data = dataResult.hits;
            dump(total);
        },function(err){
            dump(err);
        });

        // referer chart
        ApiHandling.getHitsByReferer(link.id)
        .then(function(dataResult){
            $("#referer_chart").show();
            $scope.referer_labels = dataResult.referer;
            $scope.referer_data = dataResult.hits;
            var total = Helper.totalArray(dataResult.hits);
            $scope.refererChartInfo.total = total;
            $scope.refererChartInfo.labels = dataResult.referer;
            $scope.refererChartInfo.data = dataResult.hits;
        },function(err){
            dump(err);
        });

    }  
});
