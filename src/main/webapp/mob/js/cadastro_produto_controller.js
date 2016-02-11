var modulo = angular.module('CadastroProdutoControllerMdl',['ProdutoServiceMdl']);

modulo.controller('CadastroProdutoController',[			'$scope','$location','ProdutoService',
                                               function($scope, $location, ProdutoService) {
	$scope.descricao = '';
	$scope.mensagem='';
	
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

}]);