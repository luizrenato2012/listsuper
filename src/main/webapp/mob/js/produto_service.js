var modulo = angular.module('ProdutoServiceMdl',[]);

modulo.service('ProdutoService', [ function() {
	this.produtos = [];
	this.produtosSelecionados = [];
	this.db={};
	
	//SQL pesquisa todos os produtos do backend
	this.init = function() {
		this.produtos.push({id: 1, descricao:'PRODUTO 1',selecionado: false});
		this.produtos.push({id: 2, descricao:'PRODUTO 2',selecionado: false});
		this.produtos.push({id: 3, descricao:'PRODUTO 3',selecionado: false});
		this.produtos.push({id: 4, descricao:'PRODUTO 4',selecionado: false});
		this.produtos.push({id: 5, descricao:'PRODUTO 5',selecionado: false});
		
		//this.verificaSuporteSql();
		//this.criaDatabase();
		
	}
	
	this.verificaSuporteSql = function() {
		if (window.openDatabase) {
			console.log('Suporte Web SQL ativo');
		} else {
			alert('Este navegador nao suporta Web SQL!');
		}
	}
	
	this.criaDatabase = function() {
		db = openDatabase("listsuperDB", "1.0", "Banco da teste", 200*1024);
		if (!db) {
			alert('Banco de dados nao inicializado');
			return;
		}
		
		db.transaction(function(tx){
			// na ha suporte a boolean
			tx.executeSql('create table if not exists produto (id integer primary key autoincrement, descricao varchar,' +
					' recebido integer', [] , null,null );
		}, function(data) {
			console.log('Erro ao criar tabela produto: ' + data.message);
		}, function (data) {
			console.log ('Tabela criada com sucesso! ' );
		});
	}

	this.init();

	this.getProdutos = function() {
		return this.produtos;
	}

	this.findByDescricao = function (descricao) {
		var i;
		var produto = {};
		var listaProdutos = [];
		descricao = descricao.toUpperCase();

		for(i=0; i < this.produtos.length; i++) {
			produto = this.produtos[i]; 
			if (produto.descricao.indexOf(descricao)!= -1 ) {
				listaProdutos.push(produto);
			}
		}
		return listaProdutos;
	}

	// substituir p/ implementacao SQL
	this.insert = function(descricao)  {
		descricao = descricao.toUpperCase();
		var proxId = this.produtos.length+1;
		this.produtos.push({id: proxId, descricao: descricao, selecionado: false});
	}

	/** implementacao SQL a fazer */
	this.exclui = function(idsExclusao) {
		var index = this.produtos.length-1;;
		var i;

		for(i=0; i < idsExclusao.length; i++) {
			this.excluiProduto(idsExclusao[i]);
		}
	}
	
	this.excluiProduto = function(id){
		var index = this.produtos.length-1;
		var produto= {};
		
		while ( index >= 0){
			produto = this.produtos[index];
			if (produto.id==id) {
				this.produtos.splice(index,1);
				return;
			}
			index--;
		}
	}


}]);