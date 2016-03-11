var modulo = angular.module('ListaServiceMdl',['LogServiceMdl','ItemListaServiceMdl','DaoServiceMdl']);

modulo.service('ListaService',[ '$q','$filter','LogService','ItemListaService', 'DaoService',
                               function( $q, $filter,LogService, ItemListaService, DaoService ) {
	this.listas = [];
	this.listaAtual={};
	this.db;
	this.self = this;
	
	(function(){
		self.db = DaoService.getDb();
	})();	
	
//	this.init = function() {
//		var defer = $q.defer();
//		
//		db = openDatabase("listsuperDB", "1.0", "Banco da teste", 200*1024);
//		if (!db) {
//			var msg ='Banco de dados nao inicializado'; 
//			alert(msg);
//			LogService.registra(msg);
//			defer.reject();
//			return defer.promise;
//		}
//		db.transaction(function(tx){
//			tx.executeSql('create table if not exists lista_compra (id integer primary key autoincrement, descricao timestamp)',
//						[] , null,null );
//
//		}, function(error) {
//			console.log('Erro ao criar tabela lista_compra: ' + error.message);
//			LogService.registra('Erro ao criar tabela lista_compra: ' + error.message);
//			defer.reject();
//			return defer.promise;
//		}, function (data) {
//			LogService.registra('Tabela lista_compra criada com sucesso! ' );
//		});
//		
//		return defer.promise;
//	}
	
//	this.execInit = function() {
//		this.init().then(
//			function(data){
//				//console.log(data);
//			}, function(error){
//				//console.log(error);
//			}	
//		);
//	}
	
//	this.execInit();
	
	this.getListas = function() {
		var listaCompras = [];
		var defer= $q.defer();
		
		listaCompras.push({id: null, descricao: 'Nova', itens: []});
		
		db.transaction(function(tx){
			tx.executeSql('select id, descricao from lista_compra order by id', null, 
				function(tx, results){
					var i;
					for(i=0; i < results.rows.length; i++){
						listaCompras.push ({id: results.rows.item(i)['id'], 
											descricao: results.rows.item(i)['descricao'], itens: []});
					}
					defer.resolve(listaCompras); 
				}, function(error){
					defer.reject('Erro ao pesquisar '+ error.message);
				});
		});
		return defer.promise;
	}
	
	// se for update atualiza somente os itens
	this.grava = function(lista){
		var defer = $q.defer();
		
		if(lista.id==null) {
			this.incluiLista(lista).then(
				function(data) {
					defer.resolve();
				}, function (error){
					defer.rejec();
				}
			);

			
		} else {
			this.atualizaItens(lista).then(
				function(data) {
					defer.resolve();
				}, function(error){
					defer.reject(error);
				}
			);
			
		}
		return defer.promise;
	}

	this.incluiLista = function (lista) {
		var defer = $q.defer();
		var self = this.self;
		
		self.insereLista(lista).then(
				function(data){
					self.listaAtual = lista;
					self.insereItens (lista.itens).then(
							function(data) {
								console.log('Inseridos itens');	
							}, function(error){
								defer.reject();
							}
					);
					defer.resolve();
				}, function(error){
					defer.reject();
					lista.id =null;
					//	return defer.promise;
				}
		);
		
		return defer.promise;
	}

	/** insere lista */
	this.insereLista = function(lista) {
		var defer = $q.defer();
		var i, item;
		lista.descricao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
		db.transaction(function(tx){
			tx.executeSql('insert into lista_compra (descricao) values (?)', [lista.descricao], null,null);
		}, function(error) {
			LogService.registra('Erro ao inserir ' + error.message);
			defer.reject();
		}, function(data) {
			defer.resolve();
		});
		return defer.promise;
	}

	this.insereItens = function (itens){
		
		var defer = $q.defer();
		
		this.getIdGravado().then(
			function(data){
				ItemListaService.insere(itens, data).then(
					function(data){
						defer.resolve();
					}, function (error){
						LogService.registra('Erro ao inserir item ' + error);
						defer.reject();
				});
			},
			function(error){
				defer.reject(error);
			}
		);
		
		return defer.promise;
	}
	
	
	this.getIdGravado = function (){
		var defer = $q.defer();
		
		db.transaction(function(tx){
			tx.executeSql('select max(id) from lista_compra ', null,function(tx, results){
				var id = results.rows.item(0)['max(id)'] ==null ? 1 : results.rows.item(0)['max(id)'];
				defer.resolve(id); 
			},null);
		},
		function(error) {
			LogService.registra('Erro em getIdGravado ' + error.message);
			defer.reject();
		}, function(data) {
			//defer.resolve();
		});
		return defer.promise;
	}
	
	//excluir e incluir os itens 
	this.atualizaItens = function(lista){
		var defer = $q.defer();
		
		ItemListaService.atualizaItens(lista.itens, lista.id).then(
			function(data){
				defer.resolve();
			}, function(error){
				defer.reject(error);
			}
		);
		return defer.promise;
	}
	
	/** exclui lista e itens */
	this.excluiLista = function(id) {
		var defer = $q.defer();
		
		db.transaction(function(tx){
			tx.executeSql('delete from lista_compra where id = ?', [id], null);
			tx.executeSql('delete from item_lista_compra where id_lista_compra = ? ', [id], null);

		}, function(error) {
			console.log('Erro ao excluir lista_compra: ' + error.message);
			LogService.registra('Erro ao excluir lista_compra: ' + error.message);
			defer.reject();
		}, function (data) {
			defer.resolve();
		});
		
		return defer.promise;
	}
	
	this.getListaAtual = function() {
		if (this.listaAtual.descricao==null || this.listaAtual.descricao==undefined) {
			this.listaAtual.descricao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
		}
	//	LogService.debug('ListaService.getListaAtual itens: ' + this.listaAtual.itens);
		return this.listaAtual;
	}
	
	this.teste = function() {
		console.log('Teste de escopo de função');
	}
	
	this.seleciona = function(lista) {
		var defer = $q.defer();
		var self = this.self;
		
		
		ItemListaService.getItens( lista.id, function(item) {
			lista.itens.push (item);
		}).then(
			function(data){
	//			console.log('debug - listaservice.seleciona');
				self.listaAtual = lista;
				defer.resolve();
			}, function(error){
				defer.reject(error);
				console.log(error);
			}	
		);
		return defer.promise;
	}
	
	/** implementacao especifica p/ objetos em memoria */
	this.adicionaSelecionados = function(produtoSelecionados) {
		var i ;
		var produtoAtual={};
		var produtoInclusao = {};
		
		
		var totalProdutosInclusao = produtoSelecionados.length;
		if (this.listaAtual.itens==undefined || this.listaAtual.itens==null) {
			this.listaAtual.itens = [];
		}
		var totalProdutosAtuais = this.listaAtual.itens.length;
		
		if ( totalProdutosInclusao > 0) {
			for(i=0; i < totalProdutosInclusao; i++) {
				produtoInclusao = produtoSelecionados[i];
				if (!this.jaExiste(produtoInclusao)) {
					produtoInclusao.selecionado = false;
					this.listaAtual.itens.push(produtoInclusao);
				}
			}
		}
		//this.retiraSelecao();
	}
	
	this.jaExiste = function(produto) {
		var j;
		var totalProdutosAtuais = this.listaAtual.itens.length;
		
		for(j=0; j < totalProdutosAtuais; j++){
			produtoAtual = this.listaAtual.itens[j];
			if ( produto.descricao == produtoAtual.descricao){
				return true;
			}
		}
		return false;
	}
	
	this.retiraSelecao = function() {
		var i;
		var produto = {};
		for(i=0; i < this.listaAtual.itens.length; i++) {
			produto = this.listaAtual.itens[i]; 
			produto.selecionado = false;
			produto.exclui = false;
		}
	}
	
}]);