var app = angular.module( "demo", [] );

app.controller(
	'CarouselCtrl',
	function( $scope, $routeParams, $location ) {
		$scope.carousel = [
			{header:'Item One', paragraph:'Lorem ipsum dolar', image:'img/awareness.jpg', href:'/#/guide/1'},
			{header:'Item Two', paragraph:'Lorem ipsum dolar', image:'img/lone-ranger.jpg', href:'/#/guide/2'},
			{header:'Item Three', paragraph:'Lorem ipsum dolar', image:'img/awareness.jpg', href:'/#/guide/3'},
			{header:'Item Four', paragraph:'Lorem ipsum dolar', image:'img/lone-ranger.jpg', href:'/#/guide/4'},
			{header:'Item Five', paragraph:'Lorem ipsum dolar', image:'img/awareness.jpg', href:'/#/guide/5'},
			{header:'View All', paragraph:'Lorem ipsum dolar', image:'img/lone-ranger.jpg', href:'/#/guide/6'}
		];
		
		windowWidth = window.innerWidth;
		$scope.carouselWidth = windowWidth * $scope.carousel.length;
		$scope.carouselItemWidth = windowWidth;
		$scope.transitionSpeed = .5;
		currentIndex = 1;

		$scope.gotoItem = function( index ) {
			if ( !index ) index = currentIndex;
			// find the difference between where the carousel is and where it should go
			deltaIndex = Math.abs(currentIndex - index);
			// store new index
			currentIndex = index;
			// animate to the designated index over a duration based on the difference between them
			$scope.transitionSpeed = deltaIndex * .5;
			// increment
			
			if ( -($scope.carouselWidth-$scope.carouselItemWidth) <= $scope.newPos && $scope.newPos <= 0 || $scope.newPos === undefined ) $scope.newPos = -(windowWidth*(index-1));

			console.log ( "gotoItem: " , index, $scope.newPos, $location.hash() );
			// $location.hash( index );
		};

		$scope.goNext = function() {
			// go to next page
			if ( $scope.newPos > -($scope.carouselWidth-$scope.carouselItemWidth) ) $scope.newPos -= windowWidth;
		};

		$scope.goPrev = function() {
			// go to prev page
			if ( $scope.newPos < 0 ) $scope.newPos += windowWidth;
		};

		$scope.resize = function() {
			windowWidth = window.innerWidth;
			$scope.carouselWidth = windowWidth * $scope.carousel.length;
			$scope.carouselItemWidth = windowWidth;
		};

		// $scope.gotoItem( $routeParams.index );

	});

app.controller(
	'MainNavCtrl',
	function($scope) {
		$scope.nav = [
			{header:'Home', href:'/', image:''},
			{header:'Section 1', href:'/#/guide', image:''},
			{header:'Section 2', href:'/', image:''},
			{header:'Section 3', href:'/', image:''},
			{header:'Section 4', href:'/', image:''},
			{header:'Settings', href:'/', image:''}
		];

		$scope.resize = function() {
			console.log ( 'MainNavCtrl resize!' );
		};
	});

app.directive(
	'resize',
	function() {
		function link( $scope, element, attributes ) {
			window.onresize = function() {
				$scope.$apply($scope.resize);
			}
		};
		return({
			link: link
		});
	});

app.config(function( $routeProvider, $locationProvider ) {
	// $locationProvider.html5Mode(true);
	$routeProvider.
		when('/guide/:index', {
			controller:app.CarouselCtrl, 
			templateUrl:'guide.html'}
		).
		when('/guide', {
			controller:app.CarouselCtrl, 
			templateUrl:'guide.html'}
		).
		otherwise({redirectTo:'/'});
	});

