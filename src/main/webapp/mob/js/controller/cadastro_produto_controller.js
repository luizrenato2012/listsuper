var modulo = angular.module('AppMdl',['ProdutoServiceMdl', 'LogServiceMdl', 'ControllerConstantsMdl']);

modulo.controller('CadastroProdutoController',[			'$scope','$location','ProdutoService','LogService',
                                               			'ORIGEM_TELA_PRODUTO',
                                               function($scope, $location, ProdutoService, LogService, ORIGEM_TELA_PRODUTO) {
	$scope.descricao = '';
	$scope.mensagem ='';
	$scope.argumento ='';
	$scope.produtos = [];
	
	$scope.volta = function() {
		
		if (ProdutoService.getTelaOrigem()==ORIGEM_TELA_PRODUTO.TELA) {
			$location.path("selecao_produto");
		}
	}
	
	$scope.grava = function(descricao) {
		if(descricao=='') {
			$scope.mensagem='Descrição inválida';
			return;
		}
		ProdutoService.insere(descricao).then(
				function(data) {
					$scope.mensagem = 'Produto gravado com sucesso';
					$scope.descricao='';
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
		
		ProdutoService.exclui(getIdsExclusao()).then(
			function(data){
				this.refreshTela();
			},function(error){
				LogService.registra(error);
			}
		);
		
	}
	
	/** retorna id de produtos marcados para exclusao*/
	this.getIdsExclusao = function()  {
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
	this.refreshTela = function() {
		if ($scope.argumento!=null){
			$scope.pesquisaByDescricao($scope.argumento);
		} else if ($scope.produtos.length != 0 ){
			$scope.produtos = ProdutoService.getProdutos();
		}
	}

}]);