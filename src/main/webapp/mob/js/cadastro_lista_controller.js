var modulo = angular.module('CadastroListaControllerMdl',['ListaServiceMdl']);

modulo.controller('CadastroListaController',['$scope', '$location', 'ListaService', 
                                             function($scope,$location, ListaService) {
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
	
	//exclusao em memoria - SQL via delete
	$scope.exclui = function() {
		console.log('excluindo');
		var i;
		var produto={};
		
		for(i=0;i < $scope.listaEdicao.produtos.length;i++){
			produto = $scope.listaEdicao.produtos[i];
			if (produto.exclui) {
				$scope.listaEdicao.produtos.splice(i,1);
			}
		}
	}
	
	
}]);