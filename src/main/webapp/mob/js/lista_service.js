var modulo = angular.module('ListaServiceMdl',[]);

modulo.service('ListaService',['$location', function($location) {
	this.listas = [];
	this.listaAtual={};
	
	this.seleciona= function(lista) {
		this.listaAtual = lista;
		$location.path('cadastro_lista');
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
	
	this.getListaAtual = function() {
		return this.listaAtual;
	}
	
	this.init = function() {
		this.listas.push({descricao:"Nova", id: null, dataCriacao: new Date()})
	}
	
	this.init();
	
}]);