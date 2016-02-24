var modulo = angular.module('ConfiguracoesControllerMdl', ['ProdutoServiceMdl','LogServiceMdl','ItemListaServiceMdl','ListaServiceMdl']);

modulo.controller('ConfiguracoesController',['$scope','ProdutoService','LogService','ItemListaService','ListaService',
                                             function($scope, ProdutoService, LogService, ItemListaService, ListaService){
	$scope.mensagem='';
	$scope.descricao='Descricao de teste';
	
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
		var itens= [{descricao: 'Descricao 1', selecionado:true},
			        {descricao: 'Descricao 2', selecionado:false},
			        {descricao: 'Descricao 3', selecionado:false},
			        {descricao: 'Descricao 4', selecionado:true},
			        {descricao: 'Descricao 5', selecionado:false}] ;
		var lista = {id: 1 , itens: itens };
		ItemListaService.insere(itens).then(
			function(data) {
				console.log(data);
			}, 
			function(error){
				console.error(error);
			}	
		);
	}
	
	$scope.listaItens = function() {
		var lista = [];
		ItemListaService.getItens(1, function(item ){
			lista.push(item);
		}).then(
			function(data){
				console.log('Executado ');
			}, function(error){
				console.log('erro ao listar itens ' + error);
			}
		);
	}
	
	$scope.verifica = function(){
		var lista= [];
		
		ListaService.getListas().then(
			function(data){
				lista = data;
				console.log('data '+ data);
			}, function(error){
				console.log('error '+error);
			}
		);
		console.log(lista);
		console.log('termino');
	}
}]);