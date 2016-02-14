var modulo = angular.module('ListaServiceMdl',['LogServiceMdl']);

modulo.service('ListaService',['$location', '$q','$filter','LogService', function($location, $q, $filter,LogService ) {
	this.listas = [];
	this.listaAtual={};
	this.db;
	
	this.init = function() {
		var defer = $q.defer();
		
		console.log('ListaService - criando tabela lista_service');
		// SQL busca listas no banco e acrescenta a nova
		//this.listas.push({descricao:"Nova", id: null, dataCriacao: new Date(), produtos: []});
		db = openDatabase("listsuperDB", "1.0", "Banco da teste", 200*1024);
		if (!db) {
			var msg ='Banco de dados nao inicializado'; 
			alert(msg);
			LogService.registra(msg);
			defer.reject();
			return defer.promise;
		}
		//listas de compra
		db.transaction(function(tx){
			// na ha suporte a boolean
			tx.executeSql('create table if not exists lista_compra (id integer primary key autoincrement, data timestamp)',
						[] , null,null );

		}, function(error) {
			console.log('Erro ao criar tabela lista_compra: ' + error.message);
			LogService.registra('Erro ao criar tabela lista_compra: ' + error.message);
			defer.reject();
			return defer.promise;
		}, function (data) {
			console.log ('Tabela lista_compra criada com sucesso! ' );
		});
		
		return defer.promise;
	}
	
	this.execInit = function() {
		this.init().then(
			function(data){
				console.log(data);
			}, function(error){
				console.log(error);
			}	
		);
	}
	
	this.execInit();
	
	this.getListas = function() {
		var listaCompras = [];
		var dataFormatada = {};
		var defer= $q.defer();
		
		listaCompras.push({id: null, descricao: 'Nova'});
		
		db.transaction(function(tx){
			tx.executeSql('select id, data from lista_compra ', null, 
				function(tx, results){
					var i;
					for(i=0; i < results.rows.length; i++){
						dataFormatada = $filter('date')(results.rows.item(i)['data'], 'dd/MM/yyyy HH:mm:ss');
						listaCompras.push ({id: results.rows.item(i)['id'], 
											descricao: dataFormatada});
					}
					defer.resolve(listaCompras);
				},function(error){
					console.error('Erro ao pesquisar ' +error.message);
					defer.reject(error);
				});
		});
		return defer.promise;
	}
	
	this.seleciona= function(lista) {
		this.listaAtual = lista;
		$location.path('cadastro_lista');
	}
	
	this.insere = function(lista) {
		this.listas.push(lista);
	}
	
	this.exclui = function(lista) {
		this.listas.pop();
	}
	

	
	this.getListaAtual = function() {
		return this.listaAtual;
	}
	
	/** implementacao especifica p/ objetos em memoria */
	this.adicionaSelecionados = function(lista) {
		var i ;
		var produtoAtual={};
		var produtoInclusao = {};
		
		
		var totalProdutosInclusao = lista.length;
		var totalProdutosAtuais = this.listaAtual.produtos.length;
		
		if ( totalProdutosAtuais > 0) {
			for(i=0; i < totalProdutosInclusao; i++) {
				produtoInclusao = lista[i];
				if (!this.jaExiste(produtoInclusao)) {
					this.listaAtual.produtos.push(produtoInclusao);
				}
			}
		} else {
			this.listaAtual.produtos = lista;
		}
		this.retiraSelecao();
	}
	
	this.jaExiste = function(produto) {
		var j;
		var totalProdutosAtuais = this.listaAtual.produtos.length;
		
		for(j=0; j < totalProdutosAtuais; j++){
			produtoAtual = this.listaAtual.produtos[j];
			if ( produto.id == produtoAtual.id){
				return true;
			}
		}
		return false;
	}
	
	this.retiraSelecao = function() {
		var i;
		var produto = {};
		for(i=0; i < this.listaAtual.produtos.length; i++) {
			produto = this.listaAtual.produtos[i]; 
			produto.selecionado = false;
			produto.exclui = false;
		}
	}
	
/*	this.findByDescricao = function (descricao) {
		var i;
		var produto = {};
		var listaProdutos = [];
		descricao = descricao.toUpperCase();
		
		for(i=0; i < this.listaAtual.produtos.length; i++) {
			produto = this.listaAtual.produtos[i]; 
			if (produto.descricao.indexOf(descricao)!= -1 ) {
				listaProdutos.push(produto);
			}
		}
		return listaProdutos;
	}   */
	
}]);