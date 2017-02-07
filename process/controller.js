

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

shorten.controller("statisticController", function ($scope){

    var vm = this;

});


shorten.controller("redirectController", function ($scope,$window,ApiHandling){
    var vm = this;
    var shortCode = originUrl.href.substring(originUrl.origin.length + 3);
    ApiHandling.getFullLink(shortCode)
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

});
