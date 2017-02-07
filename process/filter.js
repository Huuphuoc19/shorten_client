

shorten.filter('rmvProtocol', function() {
    return function(x) {
    	if(x == null || x == undefined)
    		return null;
        return x.replace(/^https?\:\/\//i, "");
    };
});