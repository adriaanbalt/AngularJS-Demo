/**
 * @name app.demo
 * @description construct the wrapper for the DEMO app
 */
var app = angular.module( "demo", [] );

/**
 * @name app.controller.CarouselCtrl
 * @description creates a carousel 
 */
app.controller(
	'CarouselCtrl',
	function( $scope, $routeParams, $location, $http, $timeout, index ) {
		$http.get('../carousel.json')
			.then(function(res){
			$scope.carousel = res.data;
			$scope.init();
		});

		var timeout;
		
		/**
		 * @name scope.gotoItem
		 * @param {int} index item you'd like to slide to
		 * @description goes to an item in the carousel
		 * this used to work better but then we shifted focus to try to integrate animations cleaner
		 */
		$scope.gotoItem = function( index ) {
			if ( index < 0 ) index = 0;
			if ( index >= $scope.carousel.length ) index = $scope.carousel.length-1;
			if ( !index ) index = currentIndex;
			// find the difference between where the carousel is and where it should go
			deltaIndex = Math.abs(currentIndex - index);

			// store new index
			// currentIndex = index;
			// animate to the designated index over a duration based on the difference between them
			$scope.transitionDuration = deltaIndex * .5;
			// increment
			if ( -($scope.carouselWidth-$scope.carouselItemWidth) <= $scope.newPos && $scope.newPos <= 0 || $scope.newPos === undefined ) {
				$scope.newPos = -(windowWidth*(currentIndex-1));
			} 
			// update URL hash
			$location.hash( currentIndex );
		};

		/**
		 * @name scope.clickToItem
		 * @param {integer} index the item 
		 * @description a functin called from the DOM from the subnav
		 */
		$scope.clickToItem = function( index ){
			// $timeout.cancel(timeout);
			// timeout = $timeout( autoplay, 2000 );
			$scope.gotoItem(index);
		};

		/**
		 * @name scope.goNext
		 * @description a function called from the DOM NEXT button
		 */
		$scope.goNext = function() {
			// $timeout.cancel( timeout );
			// timeout = $timeout( autoplay, 2000 );
			$scope.transitionDuration = .5;
			$scope.gotoItem( );
			// go to next page
			//if ( $scope.newPos > -($scope.carouselWidth-$scope.carouselItemWidth) ) $scope.newPos -= windowWidth;
		};

		/**
		 * @name scope.goPrev
		 * @description a function called from the DOM PREVIOUS button
		 */
		$scope.goPrev = function() {
			$timeout.cancel( timeout );
			$scope.transitionDuration = .5;
			$scope.gotoItem( currentIndex-- );
			// go to prev page
			//if ( $scope.newPos < 0 ) $scope.newPos += windowWidth;
		};

		/**
		 * @name scope.resize
		 * @description resizes the carousel
		 */
		$scope.resize = function() {
			windowWidth = window.innerWidth;
			$scope.carouselWidth = windowWidth * $scope.carousel.length;
			$scope.carouseqlItemWidth = windowWidth;
		};
		
		/**
		 * @name scope.init
		 * @description setup the initial vars
		 */
		$scope.init = function() {
			windowWidth = window.innerWidth;
			$scope.carouselWidth = windowWidth * $scope.carousel.length;
			$scope.carouselItemWidth = windowWidth;
			$scope.transitionDuration = .5;
			currentIndex = $location.hash();
			// first load up automatically repositions the carousel based on hash
			$scope.gotoItem( $location.hash() );
		};

		/**
		 * @name scope.autoplay
		 * @description i turned this off
		 */
		var autoplay = function() {
			$scope.goNext();
			// timeout = $timeout( autoplay, 1500 );
		};

		// timeout = $timeout( autoplay, 1500 );

	});

/**
 * @name app.factory.index
 * @description if you research Factory in Angular you can create a key variable that wraps the DOM to the scope of the app.  but it's a new idea so im not sure.
 * references: http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory
 */
app.factory(
	'index',
	function() {

	});
/**
 * @name app.controller.TextArea
 * @description the plan with this is that the TextArea at the bottom of the screen with the scrolling area is bound to the page via the INDEX, which will update on index change.
 */
app.controller(
	'TextArea',
	function( $scope, index ){

	});

/**
 * @name app.controller.MainNavCtrl
 * @description creates the navigation in the DOM
 */
app.controller(
	'MainNavCtrl',
	function( $scope, $http ) {
		// gets the data for the nav
		$http.get('../nav.json')
			.then(function(res){
			$scope.nav = res.data;
		});

		$scope.resize = function() {
			console.log ( 'MainNavCtrl resize!' );
		};
	});

/**
 * @name app.directive.resize
 * @description trying to modularize a single source of resize events rather than linking up a bunch to the DOM.  this sadly isn't working as well as i'd like.
 */
app.directive(
	'resize',
	function() {
		restrict: 'A', // restrict to ATTRIBUTE (could be E for "element")
		function link( $scope, element, attributes ) {
			window.onresize = function() {
				$scope.$apply($scope.resize);
			}
		};
		return({
			link: link
		});
	});

/**
 * @name app.config
 * @description sets up the routes to sub templates, urls, and hashs
 */ 
app.config(function( $routeProvider, $locationProvider ) {
	// $locationProvider.html5Mode(true);
	$routeProvider.
		when('/guide/:index', {
			controller:app.CarouselCtrl, 
			templateUrl:'guide.html',
			reloadOnSearch: false }
		).
		when('/guide', {
			controller:app.CarouselCtrl, 
			templateUrl:'guide.html',
			reloadOnSearch: false }
		).
		otherwise({redirectTo:'/'});
	});

