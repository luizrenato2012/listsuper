var modulo = angular.module('CadastroProdutoControllerMdl',['ProdutoServiceMdl']);

modulo.controller('CadastroProdutoController',[			'$scope','$location','ProdutoService',
                                               function($scope, $location, ProdutoService) {
	$scope.descricao = '';
	$scope.mensagem ='';
	$scope.argumento ='';
	$scope.produtos = [];
	
	$scope.volta = function() {
		$location.path("selecao_produto");
	}
	
	$scope.grava = function(descricao) {
		if(descricao=='') {
			$scope.mensagem='Descrição inválida';
			return;
		}
		ProdutoService.insert(descricao);
		$scope.mensagem = 'Produto gravado com sucesso';
		$scope.descricao='';
	}
	
	$scope.limpa = function() {
		$scope.mensagem='';
	}
	
	/** implementacao SQL */
	$scope.pesquisaByDescricao = function (argumento) {
		if (argumento=='') {
			$scope.mensagem = 'Sem argumento para pesquisa.';
			return;
		}
		
		$scope.produtos = ProdutoService.findByDescricao(argumento);
	}
	
	$scope.exclui = function() {
		var idsExclusao = [];
		var i;
		var produto={};
		for(i=0; i < $scope.produtos.length; i++){
			produto = $scope.produtos[i];
			if (produto.exclui) {
				idsExclusao.push(produto.id);
			}
		}
		ProdutoService.exclui(idsExclusao);
		if ($scope.argumento!=null){
			$scope.pesquisaByDescricao($scope.argumento);
		} else if ($scope.produtos.length != 0 ){
			$scope.produtos = ProdutoService.getProdutos();
		}
	}

}]);