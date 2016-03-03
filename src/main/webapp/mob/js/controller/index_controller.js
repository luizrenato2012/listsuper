var controllerModule = angular.module('AppMdl');

controllerModule.controller('IndexController' , ['$scope',function($scope) {
	
	console.log('criando IndexController');
	
	$scope.init = function() {
		console.log('debug - MainController - setando tela origem ');
	//	ProdutoService.setTelaOrigem(ORIGEM_TELA_PRODUTO.MENU);
	}
	
}] );