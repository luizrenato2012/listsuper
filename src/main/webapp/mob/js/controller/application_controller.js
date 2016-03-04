var applicationModule = angular.module('ApplicationMdl', ['ngRoute','ProdutoServiceMdl','CadastroListaControllerMdl','CadastroProdutoControllerMdl',
                                                         'ConfiguracoesControllerMdl','MenuListaControllerMdl','SelecaoProdutoControllerMdl']);

applicationModule.controller('IndexController', ['$scope', function($scope) {
	
}]);

applicationModule.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('!');
	
	$routeProvider.
		when('/cadastro_lista', 
				{ templateUrl: 'cadastro_lista.html', controller: 'CadastroListaController'})
		.when('/cadastro_produto/:origem', 
				{templateUrl: 'cadastro_produto.html', controller: 'CadastroProdutoController'})
		.when('/menu_lista',
				{templateUrl : 'menu_lista.html', controller: 'MenuListaController'})
		.when('/selecao_produto', 
				{templateUrl: 'selecao_produto.html', controller: 'SelecaoProdutoController'})
		.when('/configuracoes', 
				{templateUrl: 'configuracoes.html', controller: 'ConfiguracoesController'})
		.when('/index', 
				{templateUrl: 'index.html', controller: 'IndexController'})		
}]);

applicationModule.run(function($rootScope, $route, $routeParams, $location, ProdutoService){
	
	$rootScope.$on('$routeChangeStart', function(evt, next, current) {
		if (next != undefined && next !=null){
			var proxRota = next.pathParams;
			if (proxRota != undefined && proxRota !=null){
				ProdutoService.setTelaOrigem(proxRota['origem']);
			}
		}
		
		$rootScope.$route = $route;
		$rootScope.$location = $location;
		$rootScope.$routeParams = $routeParams;
	});
});

