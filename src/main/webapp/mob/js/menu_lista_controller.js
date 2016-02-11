var modulo = angular.module('MenuListaControllerMdl',['ListaServiceMdl']);

modulo.controller('MenuListaController', ['$scope','$location','ListaService',
                                          function($scope,$location, ListaService){
	
	$scope.listas = [];
	$scope.lista = {};
	$scope.listaSelecionada = {};
	$scope.mensagem='';
	
	$scope.seleciona = function() {
	//	console.log('Lista selecionada ' + $scope.listaSelecionada);
		if ($scope.listaSelecionada.descricao==undefined ) {
			$scope.mensagem='Selecione uma lista válida para editar';
			return;
		}
		ListaService.seleciona($scope.listaSelecionada);
		$location.path('cadastro_lista');
		
	}
	
	$scope.init = function() {
	//	console.log('iniciando MenuListaController');
		$scope.listas = ListaService.getListas();
	}
	
	$scope.insere = function() {
		ListaService.insere(lista);
	}
	
	$scope.excluir = function() {
		if ($scope.listaSelecionada.descricao==undefined || $scope.listaSelecionada.id==undefined ) {
			$scope.mensagem='Selecione uma lista válida para excluir';
			return;
		}
		
	}
	
	$scope.limpa = function() {
		$scope.mensagem=''
	}
	
	$scope.init();
	
}]);