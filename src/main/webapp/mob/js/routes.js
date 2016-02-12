var routeModule = angular.module('RouteModule',['ngRoute',	'CadastroListaControllerMdl',
                                                			'CadastroProdutoControllerMdl',
                                                			'MenuListaControllerMdl',
                                                			'SelecaoProdutoControllerMdl',
                                                			'ConfiguracoesControllerMdl']);

routeModule.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('!');
	
	$routeProvider.
		when('/cadastro_lista', 
				{ templateUrl: 'cadastro_lista.html', controller: 'CadastroListaController'})
		.when('/cadastro_produto', 
				{templateUrl: 'cadastro_produto.html', controller: 'CadastroProdutoController'})
		.when('/menu_lista',
				{templateUrl : 'menu_lista.html', controller: 'MenuListaController'})
		.when('/selecao_produto', 
				{templateUrl: 'selecao_produto.html', controller: 'SelecaoProdutoController'})
		.when('/configuracoes', 
				{templateUrl: 'configuracoes.html', controller: 'ConfiguracoesController'})		
}]);