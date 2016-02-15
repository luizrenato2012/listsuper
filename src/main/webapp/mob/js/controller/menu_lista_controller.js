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
		ListaService.seleciona($scope.listaSelecionada).then(
			function(data) {
				$scope.listaSelecionada = data;
				$location.path('cadastro_lista');
			}, function(error){
				$scope.mensagem = error;
			}	
		);
	}
	
	$scope.init = function() {
	//	console.log('iniciando MenuListaController');
		ListaService.getListas().then(
			function(data){
				$scope.listas = data;
			}, function(error){
				console.log(error);
			}
		);
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