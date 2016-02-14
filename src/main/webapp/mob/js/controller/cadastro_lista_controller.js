var modulo = angular.module('CadastroListaControllerMdl',['ListaServiceMdl']);

modulo.controller('CadastroListaController',['$scope', '$location', 'ListaService', 
                                             function($scope,$location, ListaService) {
//	console.log('iniciando CadastroListaController');
	
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
//		console.log('excluindo');
		
		var produto={};
		var indice = $scope.listaEdicao.produtos.length-1;
		
		while(indice >= 0 ) {
			produto = $scope.listaEdicao.produtos[indice];
			if (produto.exclui) {
				$scope.listaEdicao.produtos.splice(indice,1);
				indice = $scope.listaEdicao.produtos.length-1;
			} else {
				indice--;
			}
		}
	}
	
	
}]);