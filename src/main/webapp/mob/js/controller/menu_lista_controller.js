var modulo = angular.module('MenuListaControllerMdl',['ListaServiceMdl']);

modulo.controller('MenuListaController', ['$scope','$location','ListaService',
                                          function($scope,$location, ListaService){
	
	$scope.listas = [];
	$scope.lista = {};
	$scope.listaSelecionada = {};
	$scope.mensagem='';
	$scope.versao = '10/03/2015 15:26';
	
	//inicializacao
	(function() {
	//	console.log('debug - MenuListaController.init 1 ');
		ListaService.getListas().then(
			function(data){
				$scope.listas = data;
			}, function(error){
				console.log(error);
			}
		);
	})();
	
	/** lista de compras selecionada que sera detalhada na tela de cadastro de lista */
	$scope.seleciona = function() {
	//	console.log('Lista selecionada ' + $scope.listaSelecionada);
		if ($scope.listaSelecionada.descricao==undefined ) {
			$scope.mensagem='Selecione uma lista válida para editar';
			return;
		}
		ListaService.seleciona($scope.listaSelecionada).then(
			function(data) {
				//$scope.listaSelecionada = data;
				$location.path('cadastro_lista');
			}, function(error){
				$scope.mensagem = error;
			}	
		);
	}
	

	
	$scope.insere = function() {
		ListaService.insere(lista);
	}
	
	$scope.excluiLista = function(id) {
		if (id ==undefined || id==undefined ) {
			$scope.mensagem='Selecione uma lista válida para excluir';
			return;
		}
		
		if (!confirm('Confirma exclusao da lista '+ id + '?') ) {
			return;
		}
		
		ListaService.excluiLista(id).then(
			function(data){
				$scope.mensagem='Lista excluida com  sucesso.';
				$scope.init();
			}, function(error){
				$scope.mensagem='Erro ao excluir lista.';
			}
		);
		
	}
	
	$scope.limpa = function() {
		$scope.mensagem='';
	}
	
	$scope.fecha = function() {
		$location.path('/');
	}
	
	
}]);