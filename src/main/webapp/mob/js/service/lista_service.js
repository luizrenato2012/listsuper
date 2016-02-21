var modulo = angular.module('ListaServiceMdl',['LogServiceMdl','ItemListaServiceMdl']);

modulo.service('ListaService',[ '$q','$filter','LogService','ItemListaService', 
                               function( $q, $filter,LogService, ItemListaService ) {
	this.listas = [];
	this.listaAtual={};
	this.db;
	this.self = this;
	
	this.init = function() {
		console.log('ListaService - init '+ new Date());
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
			tx.executeSql('create table if not exists lista_compra (id integer primary key autoincrement, descricao timestamp)',
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
				//console.log(data);
			}, function(error){
				//console.log(error);
			}	
		);
	}
	
	this.execInit();
	
	this.getListas = function() {
		var listaCompras = [];
		var defer= $q.defer();
		
		listaCompras.push({id: null, descricao: 'Nova', itens: []});
		
		db.transaction(function(tx){
			tx.executeSql('select id, descricao from lista_compra ', null, 
				function(tx, results){
					var i;
					for(i=0; i < results.rows.length; i++){
					//	dataFormatada = $filter('date')(results.rows.item(i)['data'], 'dd/MM/yyyy HH:mm:ss');
						listaCompras.push ({id: results.rows.item(i)['id'], 
											descricao: results.rows.item(i)['descricao'], itens: []});
					}
					defer.resolve(listaCompras);
				},function(data){
					console.error('Pesquisa de listas ok. ' );
				}, function(error){
					defer.reject('Erro ao pesquisar '+ error.message);
				});
		});
		return defer.promise;
	}
	
	// se for update atualiza somente os itens
	this.grava = function(lista){
		var defer = $q.defer();
		console.log('debug - ListaService  - grava ' + new Date());
		
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

		this.getIdGravado().then(
			function(data){
				self.insereLista(lista).then(
					function(data){
						lista.id = data+1;
						self.listaAtual = lista;
						self.insereItens (lista).then(
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
			}, function(error){
				defer.reject();
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

	this.insereItens = function (lista){
		var defer = $q.defer();
		ItemListaService.insere(lista.itens, lista.id).then(
			function(data){
				defer.resolve();
			//	return defer.promise;
			}, function (error){
				LogService.registra('Erro ao inserir item ' + error);
				defer.reject();
			//	
			});
		return defer.promise;
	}
	
	
	
	this.getIdGravado = function (){
		var defer = $q.defer();
		
		db.transaction(function(tx){
			tx.executeSql('select max(id) from lista_compra ', null,function(tx, results){
				var id = results.rows.item(0)['max(id)'] ==null ? 1 : results.rows.item(0)['max(id)']+1;
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
	
	this.exclui = function(lista) {
		this.listas.pop();
	}
	
	this.getListaAtual = function() {
	//	console.log('debug -> Lista - getListaAtual ' + this.listaAtual.id+':' + 
	//			this.listaAtual.descricao + ' - ' +  new Date());
		if (this.listaAtual.descricao==null || this.listaAtual.descricao==undefined) {
		//	console.log('debug -> Lista - getListaAtual - alterando descricao - ' + new Date());
			this.listaAtual.descricao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
		}
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
				console.log('debug - listaservice.seleciona');
				self.listaAtual = lista;
			//	self.listaAtual.itens = data;
				defer.resolve();
			}, function(error){
				defer.reject(error);
				console.log(error);
			}	
		);
		return defer.promise;
	}
	
	/** implementacao especifica p/ objetos em memoria */
	this.adicionaSelecionados = function(lista) {
		var i ;
		var produtoAtual={};
		var produtoInclusao = {};
		
		
		var totalProdutosInclusao = lista.length;
		if (this.listaAtual.itens==undefined || this.listaAtual.itens==null) {
			this.listaAtual.itens = [];
		}
		var totalProdutosAtuais = this.listaAtual.itens.length;
		
		if ( totalProdutosInclusao > 0) {
			for(i=0; i < totalProdutosInclusao; i++) {
				produtoInclusao = lista[i];
				if (!this.jaExiste(produtoInclusao)) {
					this.listaAtual.itens.push(produtoInclusao);
				}
			}
		} else {
			this.listaAtual.itens = lista;
		}
		this.retiraSelecao();
	}
	
	this.jaExiste = function(produto) {
		var j;
		var totalProdutosAtuais = this.listaAtual.itens.length;
		
		for(j=0; j < totalProdutosAtuais; j++){
			produtoAtual = this.listaAtual.itens[j];
			if ( produto.id == produtoAtual.id){
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