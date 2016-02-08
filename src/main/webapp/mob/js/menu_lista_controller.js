var modulo = angular.module('MenuListaControllerMdl',['ListaServiceMdl']);

modulo.controller('MenuListaController', ['$scope','ListaService',
                                          function($scope, ListaService){
	//console.log('criando MenuListaController');
	
	$scope.listas = [];
	$scope.lista = {};
	$scope.listaSelecionada = {};
	
	$scope.seleciona = function() {
		console.log('Lista selecionada ' + $scope.listaSelecionada);
		ListService.seleciona($scope.listaSelecionada);
		
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