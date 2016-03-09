var modulo = angular.module('CadastroProdutoControllerMdl',['ProdutoServiceMdl', 'LogServiceMdl', 'ViewConstantsMdl']);

modulo.controller('CadastroProdutoController',[			'$scope','$location','ProdutoService','LogService',
                                               			'ORIGEM_TELA_PRODUTO',
                                               function($scope, $location, ProdutoService, LogService, ORIGEM_TELA_PRODUTO) {
	$scope.descricao = '';
	$scope.mensagem ='';
	$scope.argumento ='';
	$scope.produtos = [];
	$scope.exibeVolta;
	
	//inicializacao
	(function(){
		//console.log('debug cadastrto_produto_controller tela_origem ' + ProdutoService.getTelaOrigem());
		$scope.exibeVolta = ProdutoService.getTelaOrigem() == ORIGEM_TELA_PRODUTO.TELA;
	})();
	
	
	
	$scope.volta = function() {
		$location.path("selecao_produto");
	}
	
	$scope.grava = function(descricao) {
		if(descricao=='') {
			$scope.mensagem='Descrição inválida';
			return;
		}
		ProdutoService.insere(descricao).then(
				function(data) {
					$scope.descricao='';
					if (data.tipo=='OK') {
						$scope.mensagem = 'Produto cadastrado com sucesso';
					} else {
						$scope.mensagem = data.descricao;
					}
				}, function(error){
					$scope.mensagem = 'Erro ao incluir';
					$scope.descricao='';
				}
		);
		
	}
	
	$scope.limpa = function() {
		$scope.mensagem='';
	}
	
	/** implementacao SQL */
	$scope.pesquisaByDescricao = function (argumento) {
		if (argumento=='') {
			ProdutoService.listAll().then(
					function(data) {
						$scope.produtos = data;
						$scope.mensagem = 'Encontrados ' + $scope.produtos.length + ' produtos';
					}, function(error){
						LogService.registra(error);
					}
			);
		} else {
			ProdutoService.findByDescricao(argumento).then(
					function(data) {
						$scope.produtos = data;
						$scope.mensagem = 'Encontrados ' + $scope.produtos.length + ' produtos';
					}, function(error){
						LogService.registra(error);
					}
			);
		}
	}
	
	$scope.exclui = function() {
		
		ProdutoService.exclui($scope.getIdsExclusao()).then(
			function(data){
				$scope.refreshTela();
				$scope.mensagem='Produto(s) excluído(s) com sucesso';
			},function(error){
				LogService.registra(error);
				$scope.mensagem='Erro ao excluir produtos(s)';
			}
		);
		
	}
	
	/** retorna id de produtos marcados para exclusao*/
	$scope.getIdsExclusao = function()  {
		var idsExclusao = [];
		var i;
		var produto={};
		for(i=0; i < $scope.produtos.length; i++){
			produto = $scope.produtos[i];
			if (produto.exclui) {
				idsExclusao.push(produto.id);
			}
		}
		return idsExclusao;
	}
	
	/** recarrega produtos previamente pesquisados */
	$scope.refreshTela = function() {
		if ($scope.argumento!=null){
			$scope.pesquisaByDescricao($scope.argumento);
		} else if ($scope.produtos.length != 0 ){
			$scope.produtos = ProdutoService.getProdutos();
		}
	}

}]);