var modulo = angular.module('ProdutoServiceMdl',['LogServiceMdl','DaoServiceMdl']);

modulo.service('ProdutoService', ['$q','$http','LogService','DaoService', function( $q, $http, LogService, DaoService) {
	this.produtos = [];
	this.produtosSelecionados = [];
	this.db={};
	this.telaOrigem;
	var self = this;

	//inicializacao 
	(function(){
		self.db = DaoService.getDb();
	})();
	//SQL pesquisa todos os produtos do backend
//	this.init = function() {
//		var defer = $q.defer();
//		
//		db = openDatabase("listsuperDB", "1.0", "Banco da teste", 200*1024);
//		if (!db) {
//			defer.reject('Banco de dados nao inicializado');
//			LogService.registra('Banco de dados nao inicializado');
//			return promise;
//		}
//
//		db.transaction(function(tx){
//			tx.executeSql('create table if not exists produto (id integer primary key autoincrement, descricao varchar,' +
//					' recebido integer)', [] , null,null );
//			tx.executeSql(' create index if not exists idx_descricao_prod on produto (descricao)', null, null);
//
//		}, function(data) {
//			LogService.registra('Erro ao criar tabela produto: ' + data.message);
//			defer.reject('Erro ao criar tabela produto: ' + data.message);
//		}, function (data) {
//			LogService.registra('Tabela produtos criada com sucesso!');
//		});
//		return defer.promise;
//
//	}


	this.listAll = function () {
		var defer = $q.defer();

		var listaProdutos = [];
		
		this.db.transaction(function(tx){
			tx.executeSql('select id, descricao from produto order by descricao', null, 
				function(tx, results){
					var i;
					for(i=0; i < results.rows.length; i++){
						listaProdutos.push ({id: results.rows.item(i)['id'], descricao: results.rows.item(i)['descricao'],
							selecionado: false });
					}
					defer.resolve(listaProdutos);
				},function(error){
					var msg = 'Erro ao criar tabela produto: ' + data.message;
					console.error(msg);
					LogService.registra (msg);
					defer.reject(error);
				});
		});
		return defer.promise;
	}
	
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
		var self = this;
		
		this.existeProduto(descricao).then(
			function(success){
				if (success.tipo!='OK'){
					defer.resolve(success);
				} else {
					self.insereProduto(descricao).then(
						function(success) {
							defer.resolve(success);
						}, function(error){
							defer.reject(error);
						}	
					);
				}
			}, function(error){
				LogService.registra(error);
			}	
		);
		
		return defer.promise;
	}
	
	this.existeProduto = function (descricao) {
		var defer = $q.defer(), existe = false;
		
		descricao = descricao.toUpperCase();
		
		db.transaction(function(tx){
			tx.executeSql('select descricao from produto where descricao = ?', [descricao], 
					function(tx, results){
						existe = results.rows.length != null && results.rows.length > 0 ;
						var retorno = {tipo:'', mensagem: ''};
						retorno.tipo = existe ? 'ERRO_VALIDACAO' : 'OK';
						retorno.mensagem = existe ? 'Produto '+ descricao + ' já cadastrado local ' :'';
						defer.resolve(retorno);
					},function(error){
						console.error('Erro ao pesquisar ' +error.message);
						defer.reject(error);
					});
		});
		return defer.promise;
	}
	
	this.insereProduto = function(descricao)  {
		var defer = $q.defer();
		descricao = descricao.toUpperCase();
		var self = this;
		
		db.transaction( function (tx) {
			tx.executeSql('insert into produto (descricao) values (?,?)', [descricao])
		}, function(erro) {
			var msg = 'Erro ao inserir produto ' + descricao + ' '+ erro.message;
			console.log(msg);
			defer.resolve(msg);
			LogService.registra(msg);
		}, function(data) {
			var produto = {descricao: descricao};
			
			self.enviaProduto(produto).then(
				function(success){
					defer.resolve(success);
				}, function(error){
					defer.resolve(error);
				}
			);
			
		});
		return defer.promise;
	}
	
	// grava produto no backend
	this.enviaProduto = function(produto){
		var defer = $q.defer();
		
		$http.post('../rest/produtos/save', produto).then(
			function(success) {
				var retorno = {};
				var tipoMensagem = success.data.tipo;
				if (tipoMensagem == 'ERRO_SISTEMA') {
					retorno.descricao = success.data.descricao;
					retorno.tipo = 'ERRO_SISTEMA';
					defer.resolve(retorno);
				} else {
					retorno.descricao = 'Produto enviado com sucesso.';
					retorno.tipo = 'OK';
					defer.resolve(retorno);
				}
				defer.resolve(retorno);
			},
			function(error) {
				LogService.registra(error);
				defer.resolve('Erro ao cadastrar produto '+error);
			}
		);
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
	
	this.importaProdutos = function() {
		var defer = $q.defer(), produtos = [];
		var self = this;
		
		this.recebeProdutos ().then(
			function(data){
				produtos = data;
				
				self.excluiTodosProdutos ().then(
					function(data) {
						self.gravaProdutosImportados(produtos).then(
							function(){
								defer.resolve();
							}, function(error) {
								defer.reject();
							}
						);
					}, function(error){
						defer.reject();
				});
			}, function(error){
				defer.reject(error);
			}
		);
		
		return defer.promise;
	}

	// formato de retorno
	//{"data":[{"id":1,"descricao":"ARROZ","ativo":true},{"id":2,"descricao":"FEIJAO","ativo":true},{"id":3,"descricao":"LEITE","ativo":true},{"id":5,"descricao":"MANTEIGA","ativo":true},{"id":4,"descricao":"PAO","ativo":true}],
	// "status":200,
	this.recebeProdutos = function() {
		var defer = $q.defer();
			
		$http.get('../rest/produtos/list').then(
			function(success) {
				console.log('recebendo produtos');
				defer.resolve(success.data);
			},
			function(error){
				console.log('erro ao receber produtos');
				LogService.registra('Erro ao receber produtos ' + error);
				defer.reject();
			}
		);
		
		return  defer.promise;
	}
	
	
	/** recebe produtos do backend */
	this.gravaProdutosImportados = function(produtos) {
		var i,produto,defer = $q.defer();
		
		if (produtos.length==0){
			defer.reject('Sem produtos para gravar.');
			return defer.promise;
		}
		
		for(i = 0; i < produtos.length; i++){
			(function(i){
				db.transaction(function(tx){
					produto = produtos[i];
					tx.executeSql('insert into produto (descricao) values (?)',[produto.descricao]);
				}, function(error){
					LogService.registra('Erro ao gravar produtos' + error.message);
					defer.reject('Erro ao gravar produtos');
				}, function(data){
					defer.resolve();
				});
			})(i);
		}
		return defer.promise;
	}
	
	this.excluiTodosProdutos = function() {
		var defer = $q.defer();
		
		db.transaction(function(tx) {
			tx.executeSql('delete from produto ',[]);
		}, function(error) {
			LogService.registra(error);
			defer.reject('Erro ao excluir produtos');
		}, function(data) {
			defer.resolve();
		});
		
		return defer.promise;
	}
	
	this.setTelaOrigem = function(tela) {
		this.telaOrigem = tela;
	}
	
	this.getTelaOrigem = function() {
		return this.telaOrigem;
	}

}]);