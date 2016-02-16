var modulo = angular.module('ItemListaServiceMdl',['LogServiceMdl']);

modulo.service('ItemListaService',['$q','LogService', function( $q, LogService){
	var db;
	
	this.init = function() {
		db = openDatabase("listsuperDB", "1.0", "Banco da teste", 200 * 1024);
		var defer = $q.defer();
		
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
					' descricao varchar (20), selecionado integer)', null, null);
			tx.executeSql(' create index if not exists idx_descricao on item_lista_compra (descricao)', null, null);
			tx.executeSql('	create index if not exists idx_id_lista on item_lista_compra (id_lista_compra)', null, null);

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
		this.init().then(
			function(){
				//console.log();
			}, function(error){
				//console.log();
			}	
		);
	}
	
	//  http://stackoverflow.com/questions/4825455/web-sql-database-javascript-loop
	this.insere = function(itens, idLista){
		var defer = $q.defer(), item;
		for (var i=0; i < itens.length ; i++){
		(function(i) {
			
			db.transaction(function(tx){
				item = itens[i];
				tx.executeSql('insert into item_lista_compra (id_lista_compra,descricao, selecionado) values (?, ?, ?)', 
						[idLista, item.descricao, item.selecionado]);
			},function(error) {
				console.log(' erro ao incluir item ' + item.descricao +': ' + error.message);
			}, function(data) {
				console.log(' incluido item '+ item.descricao);
				if (i == itens.length-1){
					defer.resolve();
				}
			});
		})(i);
		//	defer.resolve();
		};
		return defer.promise;
	}
	
	this.execInit();
	
	this.getItens = function(idLista) {
		var defer = $q.defer();
		
		if(idLista==null){
			defer.resolve([]);
			return defer.promise;
		}
		
		db.transacion(function(tx){
			tx.executeSql('select id, descricao, seleciona from item_lista_compra where id_lista_compra=?',
					[idLista],
					function(tx, results){
						var i, listaItens, item;
						
						for(i=0; i < results.rows.length; i++){
							item = results.rows.item(i);
							listaItens.push({id:item.id, descricao: item.descricao, selecionado: item.selecionado});
						}
						defer.resolve(listaProduto);
					}, function(error){
						console.log('Erro ao carregar itens lista ' + error.message);
						LogService.registra(error.message);
						defer.reject();
					}
			);
		});
		return defer.promise;
	}
}]);