var modulo = angular.module('AppMdl', ['ProdutoServiceMdl','LogServiceMdl','ItemListaServiceMdl','ListaServiceMdl']);

modulo.controller('ConfiguracoesController',['$scope','ProdutoService','LogService','ItemListaService','ListaService',
                                             function($scope, ProdutoService, LogService, ItemListaService, ListaService){
	$scope.mensagem='';
	$scope.mensagemLog='';
	
	$scope.init = function() {
		$scope.mensagemLog = LogService.getMensagens();
	}
	$scope.init();
	
	$scope.recebeProdutos = function() {
		$scope.mensagem='';
		LogService.registra('Recebendo produtos...');
		ProdutoService.importaProdutos().then(
			function(data){
				//console.log('produtos  ' + JSON.stringify(data));
				LogService.registra('Produtos recebidos com sucesso');
				$scope.mensagem='Produtos recebidos com sucesso.';
				$scope.mensagemLog = LogService.getMensagens();
			},
			function(error){
				console.log('erro ao receber produtos');
				LogService.registra('Erro ao receber produtos ' + error);
				$scope.mensagem = 'Erro ao receber produtos ';
				$scope.mensagemLog = LogService.getMensagens();
			}
		);
	}
	
	
	$scope.criaDatabase = function() {
		ProdutoService.criaDatabase().then(
				function(data) {
					LogService.registra(data);
					$scope.mensagemLog = LogService.getMensagens();
				}
		);
		console.log('mensagem ' + $scope.mensagem);
	}
	
	$scope.verificaSuporeSql = function() {
		ProdutoService.verificaSuporteSql();
	}
	
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