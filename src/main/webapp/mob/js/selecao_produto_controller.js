var modulo = angular.module('SelecaoProdutoControllerMdl',['ProdutoServiceMdl', 'ListaServiceMdl']);

modulo.controller('SelecaoProdutoController', ['$scope', '$location','ProdutoService', 'ListaService', 
                                               function($scope, $location, ProdutoService, ListaService) {
	$scope.produtos = [];
	$scope.descricao = '';
	
	$scope.init = function() {
		$scope.produtos = ProdutoService.getProdutos();
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
	
	$scope.selecionaTodos = function(valor) {
		var i;
		$scope.produtos = ProdutoService.getProdutos(); 
		for(i=0; i < $scope.produtos.length; i++){
			$scope.produtos[i].selecionado=valor;
		}
	}
	
	$scope.pesquisaByDescricao = function (descricao) {
		if (descricao=='') {
			console.log('Sem argumento');
			return;
		}
		
		$scope.produtos = ProdutoService.findByDescricao(descricao);
	}
	
	$scope.cadastraProduto = function() {
		$location.path('cadastro_produto');
	}
	
}]);