var mainApp = angular.module('MainControllerMdl',['ProdutoServiceMdl','ControllerConstantsMdl']);

mainApp.controller('MainController' , ['$scope','ProdutoService','ORIGEM_TELA_PRODUTO',
                                       function($scope, ProdutoService, ORIGEM_TELA_PRODUTO) {
	console.log('criando MenuListaController');
	
	$scope.init = function() {
		ProdutoService.setTelaOrigem(ORIGEM_TELA_PRODUTO.MENU);
	}
	
}] );