
shorten.factory("Helper", function ($http) {
	return {
		getUrl: function(stringUrl){
			var parser = document.createElement('a');
			parser.href = stringUrl;
			return parser;
		},
		removeProtocol: function(url){
			return url.replace(/^https?\:\/\//i, "");
		}
	}
});