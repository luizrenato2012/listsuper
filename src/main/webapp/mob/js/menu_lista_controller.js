var modulo = angular.module('MenuListaControllerMdl',['ListaServiceMdl']);

modulo.controller('MenuListaController', ['$scope','$location','ListaService',
                                          function($scope,$location, ListaService){
	
	$scope.listas = [];
	$scope.lista = {};
	$scope.listaSelecionada = {};
	
	$scope.seleciona = function() {
		console.log('Lista selecionada ' + $scope.listaSelecionada);
		ListaService.seleciona($scope.listaSelecionada);
		$location.path('cadastro_lista');
		
	}
	
	$scope.init = function() {
		console.log('iniciando MenuListaController');
		$scope.listas = ListaService.getListas();
	}
	
	$scope.insere = function() {
		ListaService.insere(lista);
	}
	
	$scope.excluir = function() {
		
	}
	
	$scope.init();
	
}]);