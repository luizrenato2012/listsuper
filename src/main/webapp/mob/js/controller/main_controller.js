var mainApp = angular.module('MainControllerMdl',['ListaServiceMdl']);

mainApp.controller('MainController' , ['$scope','ControllerConstantsMdl','ProdutoServiceMdl',
                                       function($scope, ControllerConstantsMdl,ProdutoServiceMdl) {
	console.log('criando MenuListaController');
	
	$scope.init = function() {
		ProdutoService.setOrigemTela(ORIGEM_TELA_PRODUTO.MENU);
	}
	
}] );