var modulo = angular.module('ItemListaServiceMdl',['LogServiceMdl','DaoServiceMdl']);

modulo.service('ItemListaService',['$q','LogService', 'DaoService', function( $q, LogService, DaoService){
	var db;
	var self = this;
	
	(function(){
		self.db = DaoService.getDb();
	})();
	
	
	//  http://stackoverflow.com/questions/4825455/web-sql-database-javascript-loop
	this.insere = function(itens, idLista){
		var defer = $q.defer(), item;
		if (itens==null || itens==undefined){
			defer.resolve();

		} else if (idLista == null || idLista == undefined){
			defer.reject('erro ao incluir item - id lista nulo');
		} else  {
			for (var i=0; i < itens.length ; i++){
			(function(i) {
			
				self.db.transaction(function(tx){
					item = itens[i];
					tx.executeSql('insert into item_lista_compra (id_lista_compra,descricao, selecionado) values (?, ?, ?)', 
						[idLista, item.descricao, item.selecionado]);
				},function(error) {
//					console.log(' erro ao incluir item ' + item.descricao +': ' + error.message);
					LogService.registra(' erro ao incluir item ' + item.descricao +': ' + error.message);
					defer.reject(' erro ao incluir item ' + item.descricao +': ' + error.message);
				}, function(data) {
				//	console.log(' incluido item '+ item.descricao);
					if (i == itens.length-1){
						defer.resolve();
					}
				});
			})(i);
		};}

		return defer.promise;
	}
	
//	this.execInit();
	
	this.getItens = function(idLista, callbackItens) {
		var defer = $q.defer();
		//var listaItens;
		
		if(idLista==null){
			defer.resolve([]);
			return defer.promise;
		}
		
		self.db.transaction(function(tx){
			tx.executeSql('select id, descricao, selecionado from item_lista_compra where id_lista_compra=? order by descricao',
					[idLista],
					function(tx, results){
						var i,  item;
						
						for(i=0; i < results.rows.length; i++){
							item = results.rows.item(i);
							//listaItens.push({id:item.id, descricao: item.descricao, selecionado: item.selecionado});
							callbackItens ({id:item.id, descricao: item.descricao, selecionado: item.selecionado});
						}
						defer.resolve();
					}, function(error){
						console.log('Erro ao carregar itens lista ' + error.message);
						LogService.registra(error.message);
						defer.reject();
					}
			);
		});
		return defer.promise;
	}
	
	this.atualizaItens = function(itens, idListaCompra) {
		var defer = $q.defer();
		
		self.db.transaction(function(tx){
			tx.executeSql('delete from item_lista_compra where id_lista_compra = ?', 
					[idListaCompra],null,null);
		},
		function(error) {
			LogService.registra('Erro ao excluir itens ' + error.message);
			defer.reject('Erro ao excluir itens ' + error.message);
		},
		function(data) {
			if (itens.length!=0 ) {
					self.insere(itens, idListaCompra).then(
					function(data){
						defer.resolve('itens atualizados com sucesso.');
					}, function(error){
						LogService.registra('Erro ao inserir itens ' + error.message);
						defer.reject('Erro ao inserir itens ' + error.message);
					});
			} else {
				defer.resolve('sem itens para atualizar.');
			}
		});
		
		return defer.promise;
	}
}]);