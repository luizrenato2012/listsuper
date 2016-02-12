var modulo = angular.module('ConfiguracoesControllerMdl', ['ProdutoServiceMdl']);

modulo.controller('ConfiguracoesController',['$scope','ProdutoService',
                                             function($scope, ProdutoService){
	$scope.mensagem='';
	
	$scope.criaDatabase = function() {
		ProdutoService.criaDatabase();
	}
	
	$scope.verificaSuporeSql = function() {
		ProdutoService.verificaSuporteSql();
	}
}]);