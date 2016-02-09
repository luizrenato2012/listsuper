var modulo = angular.module('CadastroListaControllerMdl',['ListaServiceMdl']);

modulo.controller('CadastroListaController',['$scope', '$location', 'ListaService', function($scope,$location, ListaService) {
	console.log('iniciando CadastroListaController');
	
	$scope.listaEdicao = {};
	
	$scope.init = function() {
		$scope.listaEdicao = ListaService.getListaAtual();
	}
	
	$scope.init();
	
	$scope.volta = function() {
		$location.path("menu_lista");
	}
	
	$scope.escolheProduto = function() {
		$location.path("selecao_produto");
	}
	
	
}]);