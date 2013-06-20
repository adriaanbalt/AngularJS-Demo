
function CarouselCtrl($scope) {
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

	$scope.carouselWidth = 'width:' + window.innerWidth * $scope.carousel.length + 'px';
	$scope.carouselItemWidth = 'width:' + window.innerWidth + 'px;';
}

function MainNavCtl($scope) {
	$scope.carousel = [
		{header:'Home', paragraph:'Lorem ipsum dolar', image:''},
		{header:'Section 1', paragraph:'Lorem ipsum dolar', image:''},
		{header:'Section 2', paragraph:'Lorem ipsum dolar', image:''},
		{header:'Section 3', paragraph:'Lorem ipsum dolar', image:''},
		{header:'Section 4', paragraph:'Lorem ipsum dolar', image:''},
		{header:'Settings', paragraph:'Lorem ipsum dolar', image:''}
	];
}
function tellAngular() {
	var domElt = document.getElementById('carousel');
	$scope = angular.element(domElt).scope();
	$scope.$apply(function() {
		$scope.carouselWidth = 'width:' + window.innerWidth * $scope.carousel.length + 'px';
		$scope.carouselItemWidth = 'width:' + window.innerWidth + 'px;';
	});
}
window.onresize = tellAngular;

angular.module('demo', []).
	config(function($routeProvider) {
		console.log ( "GO");
		$routeProvider.
			// when('/', {controller:ListCtrl, templateUrl:'list.html'}).
			// when('/edit/:projectId', {controller:EditCtrl, templateUrl:'detail.html'}).
			when('/guide', {controller:CarouselCtrl, templateUrl:'guide.html'}).
			otherwise({redirectTo:'/'});
	})