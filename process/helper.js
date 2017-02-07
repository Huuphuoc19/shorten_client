


shorten.factory("Helper", function ($http) {
	return {
		getUrl: function(stringUrl){
			if(stringUrl == null)
				return null;
			var parser = document.createElement('a');
			parser.href = stringUrl;
			return parser;
		},
		removeProtocol: function(url){
			return url.replace(/^https?\:\/\//i, "");
		},
		totalArray: function(arr){
			var total = 0;
			var l = arr.length;
			for(var i = 0 ; i < l ; i++){
				total += arr[i];
			}
			return total;
		}
	}
});