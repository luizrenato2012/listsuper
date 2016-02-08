var modulo = angular.module('ListaServiceMdl',[]);

modulo.service('ListaService',[function() {
	this.listas = [];
	this.listaAtual={};
	
	this.seleciona(lista) {
		this.listaAtual = lista;
	}
	
	this.insere = function(lista) {
		this.listas.push(lista);
	}
	
	this.exclui = function(lista) {
		this.listas.pop();
	}
	
	this.getListas = function() {
		return this.listas;
	}
	
	this.init = function() {
		//console.log('iniciando ListaService');
		this.listas.push({descricao:"Nova", id: null, dataCriacao: new Date()})
	}
	
	this.init();
	
}]);