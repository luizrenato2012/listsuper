var modulo = angular.module('ListaServiceMdl',['LogServiceMdl','ItemListaServiceMdl']);

modulo.service('ListaService',[ '$q','$filter','LogService','ItemListaService', 
                               function( $q, $filter,LogService, ItemListaService ) {
	this.listas = [];
	this.listaAtual={};
	this.db;
	this.self = this;
	
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
				//console.log(data);
			}, function(error){
				//console.log(error);
			}	
		);
	}
	
	this.execInit();
	
	this.getListas = function() {
		var listaCompras = [];
		var dataFormatada = {};
		var defer= $q.defer();
		
		listaCompras.push({id: null, descricao: 'Nova', itens: []});
		
		db.transaction(function(tx){
			tx.executeSql('select id, data from lista_compra ', null, 
				function(tx, results){
					var i;
					for(i=0; i < results.rows.length; i++){
						dataFormatada = $filter('date')(results.rows.item(i)['data'], 'dd/MM/yyyy HH:mm:ss');
						listaCompras.push ({id: results.rows.item(i)['id'], 
											descricao: dataFormatada, itens: []});
					}
					defer.resolve(listaCompras);
				},function(error){
					console.error('Erro ao pesquisar ' +error.message);
					defer.reject(error);
				});
		});
		return defer.promise;
	}
	
	this.seleciona = function(lista) {
		var defer = $q.defer();
		
		ItemListaService.getItens( this.listaAtual.id).then(
			function(data){
				this.listaAtual = lista;
				this.listaAtual.itens = data;
				defer.resolve(this.listaAtual);
			}, function(error){
				defer.reject(error);
				console.log(error);
			}	
		);
		return defer.promise;
	}
	
	// se for update atualiza somente os itens
	this.grava = function(lista){
		var defer = $q.defer();
		var self = this.self;
		
		if(lista.id==null) {
			this.getIdGravado().then(
				function(data){
					self.insere(lista).then(
						function(data){
							lista.id = data+1;
							defer.resolve();
							listaAtual = lista;
							//return defer.promise;
						}, function(error){
							defer.reject();
							lista.id =null;
						//	return defer.promise;
						}
					);
					
					ItemListaService.insere(lista.itens, lista.id).then(
						function(data){
							defer.resolve();
						//	return defer.promise;
						}, function (error){
							console.log(error);
							defer.reject();
						//	return defer.promise;
						}
					);
				}, function(error){
					defer.reject();
				//	return defer.promise;
				}
			);
			
		} else {
			this.atualizaItens(lista).then(
				function(data) {
					defer.resolve();
				//	return defer.promise;
				}, function(error){
					defer.reject();
				//	return defer.promise;
				}
			);
		}
		return defer.promise;
	}
	
	/** insere lista e itens novos*/
	this.insere = function(lista) {
		var defer = $q.defer();
		var i, item;
		lista.data = new Date();
		db.transaction(function(tx){
			tx.executeSql('insert into lista_compra (data) values (?)', [lista.data], null,null);
		},
		function(error) {
			LogService.registra('Erro ao inserir ' + error.message);
			defer.reject();
		},
		function(data) {
			defer.resolve();
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
		
		db.transaction(function(tx){
			tx.executeSql('delete from lista_compra where id_lista_compra = ?', [lista.id],null,null);
			for(i=0; i < lista.itens; i++) {
				item = lista.item[i];
				tx.executeSql('insert into item_lista_compra (id_lista_compra,descricao, selecionado) values (?, ?, ?)', 
						[lista.id, item.descricao, false],null,null);
			}
		},
		function(error) {
			LogService.registra('Erro ao atualizar itens ' + error.message);
			defer.reject();
		},
		function(data) {
			defer.resolve();
		});
		
		return defer.promise;
	}
	
	this.exclui = function(lista) {
		this.listas.pop();
	}
	
	this.getListaAtual = function() {
		if (this.listaAtual.data==null || this.listaAtual.data==null) {
			this.listaAtual.data = new Date();
		}
		this.listaAtual.descricao = $filter('date')(this.listaAtual.data, 'dd/MM/yyyy HH:mm:ss');
		return this.listaAtual;
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