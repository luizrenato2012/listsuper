var modulo = angular.module('CadastroProdutoControllerMdl',[]);

modulo.controller('CadastroProdutoController',['$cope','$location',function($scope, $location) {
	
	$scope.volta = function() {
		$location.path("cadastro_lista");
	}

}]);