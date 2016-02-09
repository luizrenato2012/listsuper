var modulo = angular.module('SelecaoProdutoControllerMdl',['ProdutoServiceMdl', 'ListaServiceMdl']);

modulo.controller('SelecaoProdutoController', ['$scope', '$location','ProdutoService', 'ListaService', 
                                               function($scope, $location, ProdutoService, ListaService) {
	$scope.produtos = [];
	
	$scope.init = function() {
		$scope.produtos = ProdutoService.getProdutos();
		console.log('debug');
	}
	
	$scope.init();
	

	$scope.volta = function() {
		var i;
		var produto = {};
		var produtosSelecionados = [];
		
		for(i=0; i < $scope.produtos.length;i++) {
			produto = $scope.produtos[i];
			if (produto.selecionado) {
				produto.comprado=false;
				produtosSelecionados.push(produto);
			}
		}
		ListaService.adicionaSelecionados(produtosSelecionados);
		$location.path('cadastro_lista');
	}
	
}]);