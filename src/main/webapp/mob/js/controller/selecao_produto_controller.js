var modulo = angular.module('SelecaoProdutoControllerMdl',['ProdutoServiceMdl', 'ListaServiceMdl','LogServiceMdl','ViewConstantsMdl']);

modulo.controller('SelecaoProdutoController', ['$scope', '$location','ProdutoService', 'ListaService', 'LogService','ORIGEM_TELA_PRODUTO',
                                               function($scope, $location, ProdutoService, ListaService, LogService, ORIGEM_TELA_PRODUTO) {
	$scope.produtos = [];
	$scope.descricao = '';


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
		
		for(i=0; i < $scope.produtos.length; i++){
			$scope.produtos[i].selecionado=valor;
		}
	}

	$scope.pesquisaByDescricao = function (descricao) {
		if (descricao=='') {
			$scope.listaTodos();
		} else {
			$scope.listaPorDescricao(descricao);
		}
	}
	
	$scope.listaTodos = function () {
		ProdutoService.listAll().then(
				function(data){
					$scope.produtos = data;
				}, function(error){
					LogService.registra(error);
				}
			);
	}
	
	$scope.listaPorDescricao = function (descricao) {
		ProdutoService.findByDescricao(descricao.toUpperCase()).then(
				function(data) {
					$scope.produtos = data;
				}, function(error){
					LogService.registra(error);
				}
			);
	}

	$scope.cadastraProduto = function() {
	//	console.log('debug - selecao_produto_controller.cadastraProduto');
		ProdutoService.setTelaOrigem(ORIGEM_TELA_PRODUTO.TELA);
		$location.path('cadastro_produto/tela');
	}

}]);