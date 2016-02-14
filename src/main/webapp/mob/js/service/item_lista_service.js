var modulo = angular.module('ItemListaMdl',['LogServiceMdl']);

modulo.service('ItemListaService',['$q','LogService', function( $q, LogService){
	var db;
	
	this.init = function() {
		db = openDatabase("listsuperDB", "1.0", "Banco da teste", 200 * 1024);
		
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
			tx.executeSql('create table if not exists item_lista_compra (id integer primary key autoincrement, id_lista_compra integer,'+
					' descricao varchar (20), selecionado integer);'+
					' create index idx_descricao on item_lista_compra(descricao);'+
					' create index idx_id_lista on item_lista_compra(id_lista_compra)',
						[] , null,null );

		}, function(error) {
			console.log('Erro ao criar tabela item lista_compra: ' + error.message);
			LogService.registra('Erro ao criar tabela item lista_compra: ' + error.message);
			defer.reject();
		}, function (data) {
			console.log ('Tabela item_lista_compra criada com sucesso! ' );
			defer.resolve();
		});
		
		return defer.promise;
	}
	
	this.execInit = function() {
		this,init().then(
			function(data){
				console.log(data);
			}, function(error){
				console.log(error);
			}	
		);
	}
	
	this.execInit();
	
	this.getItens = function() {
		
	}
}]);