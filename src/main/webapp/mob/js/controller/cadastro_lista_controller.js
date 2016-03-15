var modulo = angular.module('CadastroListaControllerMdl',['ListaServiceMdl']);

modulo.controller('CadastroListaController',['$scope', '$location', 'ListaService', 
                                             function($scope,$location, ListaService) {
//	console.log('iniciando CadastroListaController');
	
	$scope.listaEdicao = {};
	$scope.mensagem='';
	$scope.valorTrue=true;
	
	$scope.init = function() {
		$scope.listaEdicao = ListaService.getListaAtual();
		$scope.mensagem='';
	}
	
	$scope.init();
	
	$scope.volta = function() {
		$location.path("menu_lista");
	}
	
	$scope.escolheProduto = function() {
		$location.path("selecao_produto");
	}
	
	$scope.limpaMensagem = function() {
		$scope.mensagem='';
	}
	
	
	//exclusao em memoria - SQL via delete
	$scope.exclui = function() {
//		console.log('excluindo');
		
		var produto={};
		var indice = $scope.listaEdicao.itens.length-1;
		
		while(indice >= 0 ) {
			produto = $scope.listaEdicao.itens[indice];
			if (produto.exclui) {
				$scope.listaEdicao.itens.splice(indice,1);
				indice = $scope.listaEdicao.itens.length-1;
			} else {
				indice--;
			}
		}
	}
	
	$scope.grava = function(){
		ListaService.grava($scope.listaEdicao).then(
			function(data){
				//$scope.listaEdicao = data;
				$scope.mensagem = 'Lista atualizada/incluída com sucesso';
				this.lista = ListaService.getListaAtual();
			}, function(error){
				$scope.mensagem='Erro ao atualizar/incluir';
			}	
		);
	}
	
	
}]);