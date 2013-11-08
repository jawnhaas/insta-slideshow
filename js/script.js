// Define a new module. This time we declare a dependency on
// the ngResource module, so we can work with the Instagram API

var app = angular.module("slide-agram", ['ngResource', 'ui', 'ui.bootstrap'])
	.config(instagramRouter);

function instagramRouter ($routeProvider)
{
	$routeProvider
		.when('/', {templateUrl: 'partials/images.html'})
		.when('/image', {template: '<h1>Image Detail</h1>'});

}

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

// Create and register the new "instagram" service
app.factory('Instagram', ['$resource',
	function($resource){

	return {
		fetchPopular: function(tagid, nexturl, callback){
			var url = 'https://api.instagram.com/v1/tags/:tag_id/media/recent?client_id=:client_id&max_tag_id=:max_tag_id&callback=JSON_CALLBACK&count=100';
			var api = $resource(url,{client_id: '642176ece1e7445e99244cec26f4de1f', tag_id: '@tag_id', max_tag_id: '@max_tag_id'},{
				// This creates an action which we've chosen to name "fetch". It issues
				// an JSONP request to the URL of the resource. JSONP requires that the
				// callback=JSON_CALLBACK part is added to the URL.
				fetch:{method:'JSONP'}
			});

			api.fetch({tag_id: tagid, max_tag_id: nexturl}, function(response){		
				// Call the supplied callback functione;
				callback(response);

			});

		}

	}

}]);

app.factory('Slideshow', function() {
	var Slideshow = {};
  	var slides = [];
  	Slideshow.getItem = function(index) { return slides[index]; }
  	Slideshow.addItem = function(item) { slides.push(item); }
  	Slideshow.removeItem = function(item) { slides.splice(slides.indexOf(item), 1) }
  	Slideshow.size = function() { return slides.length; }
  	Slideshow.getAll = function() { return slides; }

  	return Slideshow;
 });








// The controller. Notice that I've included our instagram service which we
// defined below. It will be available inside the function automatically.

