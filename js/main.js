
var app = angular.module( "demo", [] );

app.controller(
	'CarouselCtrl',
	function( $scope ) {
		$scope.carousel = [
			{header:'Item One', paragraph:'Lorem ipsum dolar', image:'', href:''},
			{header:'Item Two', paragraph:'Lorem ipsum dolar', image:'', href:''},
			{header:'Item Three', paragraph:'Lorem ipsum dolar', image:'', href:''},
			{header:'Item Four', paragraph:'Lorem ipsum dolar', image:'', href:''},
			{header:'Item Five', paragraph:'Lorem ipsum dolar', image:'', href:''},
			{header:'View All', paragraph:'Lorem ipsum dolar', image:'', href:''}
		];
		
		$scope.goNext = function() {
			// go to next page
			console.log ( "NEXT!" );
		};

		$scope.goPrev = function() {
			// go to prev page
			console.log ( "PREV!" );
		};

		$scope.resize = function() {
			$scope.carouselWidth = 'width:' + window.innerWidth * $scope.carousel.length + 'px;';
			$scope.carouselItemWidth = 'width:' + window.innerWidth + 'px;';
			console.log ( 'CarouselCtrl resize! ', $scope.carouselWidth, $scope.carouselItemWidth );
		};

		$scope.resize();

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

app.config(function($routeProvider) {
		console.log ( "GO");
		$routeProvider.
			// when('/', {controller:ListCtrl, templateUrl:'list.html'}).
			// when('/edit/:projectId', {controller:EditCtrl, templateUrl:'detail.html'}).
			when('/guide', {controller:app.CarouselCtrl, templateUrl:'guide.html'}).
			otherwise({redirectTo:'/'});
	});

