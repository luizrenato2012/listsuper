var modulo = angular.module('ConfiguracoesControllerMdl', ['ProdutoServiceMdl','LogServiceMdl','ItemListaServiceMdl']);

modulo.controller('ConfiguracoesController',['$scope','ProdutoService','LogService','ItemListaService',
                                             function($scope, ProdutoService, LogService, ItemListaService){
	$scope.mensagem='';
	$scope.descricao='';
	
	$scope.init = function() {
		$scope.mensagem = LogService.getMensagens();
	}
	$scope.init();
	
	$scope.criaDatabase = function() {
		ProdutoService.criaDatabase().then(
				function(data) {
					LogService.registra(data);
					$scope.mensagem = LogService.getMensagens();
				}
		);
		console.log('mensagem ' + $scope.mensagem);
	}
	
	$scope.verificaSuporeSql = function() {
		ProdutoService.verificaSuporteSql();
	}
	
//	$scope.insere = function(descricao) {
//		if (descricao==undefined || descricao==''){
//			$mensagem='Descricao invalida';
//			return;
//		}
//		descricao = descricao.toUpperCase();
		
//		ProdutoService.insere(descricao).then(function(data){
//			LogService.registra(data);
//			$scope.mensagem = LogService.getMensagens();
//			$scope.descricao='';
//		});
//	}
	
	$scope.pesquisa = function(descricao){
		ProdutoService.findByDescricao(descricao).then(
			function(data) {
				console.log(data);
			}, 
			function(error){
				console.error(error);
			}
		);
	}
	
	$scope.insereItem = function(){
		var item = {idCompra: 1 , descricao: 'Descricao ', selecionado:true};
		ItemListaService.insere(item).then(
			function(data) {
				console.log(data);
			}, 
			function(error){
				console.error(error);
			}	
		);
	}
}]);