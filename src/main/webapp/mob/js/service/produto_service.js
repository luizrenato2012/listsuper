var modulo = angular.module('ProdutoServiceMdl',['LogServiceMdl']);

modulo.service('ProdutoService', ['LogService','$q', function(LogService, $q) {
	this.produtos = [];
	this.produtosSelecionados = [];
	this.db={};

	//SQL pesquisa todos os produtos do backend
	this.init = function() {
		console.log('produto_service: iniciando... ');
//		this.produtos.push({id: 1, descricao:'PRODUTO 1',selecionado: false});
//		this.produtos.push({id: 2, descricao:'PRODUTO 2',selecionado: false});
//		this.produtos.push({id: 3, descricao:'PRODUTO 3',selecionado: false});
//		this.produtos.push({id: 4, descricao:'PRODUTO 4',selecionado: false});
//		this.produtos.push({id: 5, descricao:'PRODUTO 5',selecionado: false});
		
		var defer = $q.defer();
		
		db = openDatabase("listsuperDB", "1.0", "Banco da teste", 200*1024);
		if (!db) {
			alert('Banco de dados nao inicializado');
			defer.reject('Banco de dados nao inicializado');
			return promise;
		}

		db.transaction(function(tx){
			// na ha suporte a boolean
			tx.executeSql('create table if not exists produto (id integer primary key autoincrement, descricao varchar,' +
					' recebido integer, novo integer)', [] , null,null );

		}, function(data) {
			console.log('Erro ao criar tabela produto: ' + data.message);
			defer.rejrect('Erro ao criar tabela produto: ' + data.message);
		}, function (data) {
			console.log ('Tabela criada com sucesso! ' );
			
		});
		return defer.promise;

	}


	this.listAll = function () {
		var defer = $q.defer();

		var listaProdutos = [];
		
		db.transaction(function(tx){
			tx.executeSql('select id, descricao from produto ', null, 
				function(tx, results){
					var i;
					for(i=0; i < results.rows.length; i++){
						listaProdutos.push ({id: results.rows.item(i)['id'], descricao: results.rows.item(i)['descricao'],
							selecionado: false });
					}
					defer.resolve(listaProdutos);
				},function(error){
					console.error('Erro ao pesquisar ' +error.message);
					defer.reject(error);
				});
		});
		return defer.promise;
	}
	
	this.init();

	this.verificaSuporteSql = function() {
		if (window.openDatabase) {
			console.log('Suporte Web SQL ativo');
			LogService.registra('Suporte Web SQL ativo');
		} else {
			alert('Este navegador nao suporta Web SQL!');
			LogService.registra('Este navegador nao suporta Web SQL!');
		}
	}



	this.insere = function(descricao)  {
		var defer = $q.defer();
		descricao = descricao.toUpperCase();

		db.transaction( function (tx) {
			tx.executeSql('insert into produto (descricao,novo) values (?,?)', [descricao, false])
		}, function(erro) {
			var msg = 'Erro ao inserir produto ' + descricao + ' '+ erro.message;
			console.log(msg);
			defer.resolve(msg);
		}
		, function(data) {
			var msg = 'Produto inserido com sucesso!' ;
			console.log(msg);
			defer.resolve(msg);
		});
		return defer.promise;
	}


	
	this.findByDescricao = function (descricao) {
		var defer = $q.defer();

		var listaProdutos = [];
		descricao = descricao.toUpperCase();

		db.transaction(function(tx){
			tx.executeSql('select id, descricao from produto where descricao like ?', [descricao+'%'], 
					function(tx, results){
						var i;
						for(i=0; i < results.rows.length; i++){
							listaProdutos.push ({id: results.rows.item(i)['id'], descricao: results.rows.item(i)['descricao'] });
						}
						defer.resolve(listaProdutos);
					},function(error){
						console.error('Erro ao pesquisar ' +error.message);
						defer.reject(error);
					});
		});
		return defer.promise;
	}
	

	this.getProdutos = function() {
		var defer = $q.defer();
		
		this.listAll().then(
				function(data) {
					this.produtos = data;
					defer.resolve(data);
				},
				function(erro){
					console.log(erro);
					defer.reject(erro);
				}
		);

		return defer.promise;
	}


	/** pesquisa produtos numa determinada lista */
//	this.findByDescricao = function (descricao, listaProdutos) {
//		var i;
//		var produto = {};
//		var novaListaProdutos = [];
//		descricao = descricao.toUpperCase();

//		for(i=0; i < listaProdutos.length; i++) {
//			produto = listaProdutos[i]; 
//			if (produto.descricao.indexOf(descricao)!= -1 ) {
//				novaListaProdutos.push(produto);
//			}
//		}
//		return novaListaProdutos;
//	}

		// substituir p/ implementacao SQL
//		this.insert = function(descricao)  {
//		descricao = descricao.toUpperCase();
//		var proxId = this.produtos.length+1;
//		this.produtos.push({id: proxId, descricao: descricao, selecionado: false});
//		}

		/** implementacao SQL a fazer */
	//	this.exclui = function(idsExclusao) {
	//		var index = this.produtos.length-1;;
	//		var i;

	//		for(i=0; i < idsExclusao.length; i++) {
	//			this.excluiProduto(idsExclusao[i]);
	//		}
	//	}
		
	this.exclui = function(idsExclusao) {
		var defer = $q.defer();
		var statement = 'delete from produto where id in ( ';
		var i ;
		var total = idsExclusao.length;
	
		for(i=0; i < total; i++){
			statement = statement.concat(idsExclusao[i]);
			if (i < total-1) {
				statement = statement.concat(', '); 
			} else {
				statement = statement.concat(' ) '); 
			}
		}
		
		
		console.log('statement ' + statement );
		
		db.transaction(function(tx) {
			tx.executeSql(statement ,null, null, null);
		}, function(error) {
			var msg = 'Erro ao excluir produto: '+ error.message;
			console.log(msg);
			defer.resolve(msg);
		}, function(data){
			var msg = 'Produto excluídos com sucesso' ;
			console.log(msg);
			defer.resolve(msg);
		});
			
		return defer.promise;
	}

//	this.excluiProduto = function(id){
//		var index = this.produtos.length-1;
//		var produto= {};
//			while ( index >= 0){
//			produto = this.produtos[index];
//			if (produto.id==id) {
//				this.produtos.splice(index,1);
//				return;
//			}
//			index--;
//		}
//	}


}]);