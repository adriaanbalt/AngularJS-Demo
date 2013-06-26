var app = angular.module( "demo", [] );

app.controller(
	'CarouselCtrl',
	function( $scope, $routeParams, $location, $http ) {
		$http.get('../carousel.json')
			.then(function(res){
			$scope.carousel = res.data;
			$scope.init();
		});
		
		$scope.gotoItem = function( index ) {
			if ( !index ) index = currentIndex;
			// find the difference between where the carousel is and where it should go
			deltaIndex = Math.abs(currentIndex - index);
			// store new index
			currentIndex = index;
			// animate to the designated index over a duration based on the difference between them
			$scope.transitionDuration = deltaIndex * .5;
			// increment
			if ( -($scope.carouselWidth-$scope.carouselItemWidth) <= $scope.newPos && $scope.newPos <= 0 || $scope.newPos === undefined ) $scope.newPos = -(windowWidth*(index-1));
			// update URL hash
			$location.hash( index );
		};

		$scope.goNext = function() {
			$scope.transitionDuration = .5;
			// go to next page
			if ( $scope.newPos > -($scope.carouselWidth-$scope.carouselItemWidth) ) $scope.newPos -= windowWidth;
		};

		$scope.goPrev = function() {
			$scope.transitionDuration = .5;
			// go to prev page
			if ( $scope.newPos < 0 ) $scope.newPos += windowWidth;
		};

		$scope.resize = function() {
			windowWidth = window.innerWidth;
			$scope.carouselWidth = windowWidth * $scope.carousel.length;
			$scope.carouselItemWidth = windowWidth;
		};
		
		$scope.init = function() {
			windowWidth = window.innerWidth;
			$scope.carouselWidth = windowWidth * $scope.carousel.length;
			$scope.carouselItemWidth = windowWidth;
			$scope.transitionDuration = .5;
			currentIndex = 1;
			// first load up automatically repositions the carousel based on hash
			$scope.gotoItem( $location.hash() );
		}

	});

app.controller(
	'MainNavCtrl',
	function( $scope, $http ) {
		$http.get('../nav.json')
			.then(function(res){
			$scope.nav = res.data;
		});

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

