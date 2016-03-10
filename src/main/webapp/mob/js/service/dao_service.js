var modulo = angular.module('DaoServiceMdl',['LogServiceMdl']);

modulo.service('DaoService',['LogService','$q', function(LogService,$q) {
	
	var db;
	var self = this;
	
	this.initDatabase = function() {
		var defer = $q.defer();
	//	console.log('initDatabase');
		
		db = openDatabase("listsuperDB", "1.0", "Banco da teste", 200*1024);
		if (!db) {
			//alert('Banco de dados nao inicializado');
			defer.reject('Banco de dados nao inicializado');
			LogService.registra('Banco de dados nao inicializado');
		} else {
			console.log('banco de dados inicializado');
			defer.resolve();
		}
		
		return defer.promise;
	}
	
	this.criaTabelaProdutos = function() {
		var defer = $q.defer();
		console.log('Iniciando criaTabelaProdutos');
		
		db.transaction(function(tx){
			// na ha suporte a boolean
			tx.executeSql('create table if not exists produto (id integer primary key autoincrement, descricao varchar,' +
					' recebido integer)', [] , null,null );
			tx.executeSql(' create index if not exists idx_descricao_prod on produto (descricao)', null, null);

		}, function(data) {
			LogService.registra('Erro ao criar tabela produto: ' + data.message);
			defer.reject('Erro ao criar tabela produto: ' + data.message);
		}, function (data) {
			console.log ('Tabela de produtos criada com sucesso! ' );
			LogService.registra('Tabela produtos criada com sucesso!');
			defer.resolve();
		});
		return defer.promise;
	}
	
	this.criaTabelaLista = function() {
		console.log('iniciando criaTabelaLista');
		var defer = $q.defer();
		
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
			console.log('Tabela lista_compra criada com sucesso! ');
			LogService.registra('Tabela lista_compra criada com sucesso! ' );
		});
		return defer.promise;
	}
	
	this.criaTabelaItens = function() {
		console.log('iniciando criaTabelaItens');
		var defer = $q.defer();
		
		db.transaction(function(tx){
			// na ha suporte a boolean
			tx.executeSql('create table if not exists item_lista_compra (id integer primary key autoincrement, id_lista_compra integer,'+
					' descricao varchar (20), selecionado integer)', null, null);
			tx.executeSql(' create index if not exists idx_descricao on item_lista_compra (descricao)', null, null);
			tx.executeSql('	create index if not exists idx_id_lista on item_lista_compra (id_lista_compra)', null, null);

		}, function(error) {
			console.log('Erro ao criar tabela item lista_compra: ' + error.message);
			LogService.registra('Erro ao criar tabela item lista_compra: ' + error.message);
			defer.reject();
		}, function (data) {
			console.log('Tabela item_lista_compra criada com sucesso! ');
			LogService.registra('Tabela item_lista_compra criada com sucesso! ' );
			defer.resolve();
		});
		return defer.promise;
		
		return defer.promise;
	}
	
	this.init = function() {
		console.log('Iniciando DaoService');
		self.initDatabase().then
		(self.criaTabelaProdutos()).then
		(self.criaTabelaLista()).then
		(self.criaTabelaItens()).then(
				function(data) {
					//LogService.registra(data);
					console.log('Finalizado processo de inicializacao');
				}, function(error) {
					Log.service.registra(error);
				}	
		);
	};
	
	this.init();
	
	this.getDbConnection = function() {
		console.log('executando getDbConnection');
		return db;
	}
	
	
	
}]);